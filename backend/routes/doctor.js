import express from 'express';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// Middleware to verify doctor ownership
const verifyDoctor = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.body.userId;
    if (!userId) return res.status(401).json({ message: 'Missing userId' });
    const user = await User.findById(userId);
    if (user && user.role === 'doctor') {
      req.doctorUser = user;
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Invalid role or user not found' });
    }
  } catch (error) {
    console.error('Error in verifyDoctor middleware:', error.message);
    res.status(500).json({ message: 'Internal server error in verification' });
  }
};

// Get list of doctors (for patient registration)
router.get('/list', async (req, res) => {
  try {
    const { clinic } = req.query;
    const filter = clinic ? { clinic } : {};
    const doctors = await Doctor.find(filter)
      .populate('user', 'name')
      .select('fullName specialization clinic user');
    res.json(doctors);
  } catch (err) {
    console.error('Error fetching doctors list:', err.message);
    res.status(500).json({ message: 'Server error fetching doctors' });
  }
});

// Get doctor profile
router.get('/profile/:userId', verifyDoctor, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.params.userId }).populate('user', 'name email role');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    console.error('Error fetching doctor profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get patients assigned to this doctor (or all patients if none explicitly assigned)
router.get('/patients/:userId', verifyDoctor, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.params.userId });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    // Fetch patients assigned to this doctor
    const patients = await Patient.find({ assignedDoctor: doctor._id })
      .populate('user', 'name email')
      .populate('assignedDoctor');

    res.json(patients);
  } catch (err) {
    console.error('Error fetching doctor patients:', err.message);
    res.status(500).json({ message: 'Server error fetching patient records' });
  }
});

// Update doctor profile (including qualification, experience, licenseNumber, bio, imageUrl)
router.put('/profile/:userId', verifyDoctor, async (req, res) => {
  const { fullName, specialization, qualification, experience, clinic, contact, licenseNumber, imageUrl, bio } = req.body;
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { user: req.params.userId },
      { fullName, specialization, qualification, experience, clinic, contact, licenseNumber, imageUrl, bio },
      { new: true }
    ).populate('user', 'name email role');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    console.error('Error updating doctor profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
