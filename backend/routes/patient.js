import express from 'express';
import Patient from '../models/Patient.js';
import User from '../models/User.js';

const router = express.Router();

// Middleware to verify patient ownership
const verifyPatient = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.body.userId;
    if (!userId) return res.status(401).json({ message: 'Missing userId' });
    const user = await User.findById(userId);
    if (user && user.role === 'patient') {
      req.patientUser = user;
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Invalid role or user not found' });
    }
  } catch (error) {
    console.error('Error in verifyPatient middleware:', error.message);
    res.status(500).json({ message: 'Internal server error in verification' });
  }
};

// Get patient profile (includes linked user info and assigned doctor)
router.get('/profile/:userId', verifyPatient, async (req, res) => {
  try {
    let patient = await Patient.findOne({ user: req.params.userId })
      .populate('user', 'name email role')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'user', select: 'name email' }
      });

    if (!patient) {
      // Auto-create profile if missing for patient user
      const userDoc = req.patientUser;
      patient = await Patient.create({
        user: userDoc._id,
        childName: userDoc.name || 'Hero Child',
        age: 5,
        clinic: 'Chennai South Autism Care',
        parentName: userDoc.name || 'Caregiver',
        contact: '+91 98000 00000',
      });
      patient = await Patient.findById(patient._id).populate('user', 'name email role');
    }

    res.json(patient);
  } catch (err) {
    console.error('Error fetching patient profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update patient profile (including assigned doctor and all fields)
router.put('/profile/:userId', verifyPatient, async (req, res) => {
  const { childName, age, gender, clinic, parentName, relationship, contact, assignedDoctor, imageUrl } = req.body;
  try {
    const patient = await Patient.findOneAndUpdate(
      { user: req.params.userId },
      { childName, age, gender, clinic, parentName, relationship, contact, assignedDoctor, imageUrl },
      { new: true }
    ).populate('user', 'name email role')
     .populate({
       path: 'assignedDoctor',
       populate: { path: 'user', select: 'name email' }
     });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    console.error('Error updating patient profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save or update communication progress
router.post('/communication-progress/:userId', verifyPatient, async (req, res) => {
  const { day, accuracy, hintsUsed, turnsCount } = req.body;
  try {
    const patient = await Patient.findOne({ user: req.params.userId });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    if (!patient.communicationProgress) {
      patient.communicationProgress = { currentDay: 1, completedDays: [], dayStats: [] };
    }

    if (!patient.communicationProgress.completedDays.includes(day)) {
      patient.communicationProgress.completedDays.push(day);
    }
    if (day >= patient.communicationProgress.currentDay) {
      patient.communicationProgress.currentDay = day + 1;
    }

    const existingIndex = patient.communicationProgress.dayStats.findIndex(s => s.day === day);
    const statData = {
      day,
      accuracy: accuracy || 100,
      hintsUsed: hintsUsed || 0,
      turnsCount: turnsCount || 1,
      lastPracticed: new Date(),
      status: 'completed'
    };

    if (existingIndex >= 0) {
      patient.communicationProgress.dayStats[existingIndex] = statData;
    } else {
      patient.communicationProgress.dayStats.push(statData);
    }

    await patient.save();
    res.json({ message: 'Communication progress updated successfully', progress: patient.communicationProgress });
  } catch (err) {
    console.error('Error updating communication progress:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get communication progress
router.get('/communication-progress/:userId', verifyPatient, async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.params.userId });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient.communicationProgress || { currentDay: 1, completedDays: [], dayStats: [] });
  } catch (err) {
    console.error('Error fetching communication progress:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
