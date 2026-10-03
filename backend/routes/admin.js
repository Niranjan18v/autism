import express from 'express';
import User from '../models/User.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Get full system data overview for Admin Dashboard
router.get('/data', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    const patients = await Patient.find()
      .populate('user', 'name email role createdAt')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'user', select: 'name email' }
      });
    const doctors = await Doctor.find()
      .populate('user', 'name email role createdAt');

    // Calculate patient counts per doctor
    const doctorStats = doctors.map(doc => {
      const docObj = doc.toObject();
      const patientCount = patients.filter(
        p => p.assignedDoctor && p.assignedDoctor._id.toString() === doc._id.toString()
      ).length;
      return {
        ...docObj,
        patientCount,
      };
    });

    const clinics = Array.from(new Set([
      ...patients.map(p => p.clinic).filter(Boolean),
      ...doctors.map(d => d.clinic).filter(Boolean)
    ]));

    res.json({
      stats: {
        totalUsers: users.length,
        totalPatients: patients.length,
        totalDoctors: doctors.length,
        totalClinics: clinics.length,
      },
      users,
      patients,
      doctors: doctorStats,
      clinics,
    });
  } catch (error) {
    console.error('Error fetching admin data:', error.message);
    res.status(500).json({ message: 'Server error loading admin dashboard data' });
  }
});

// Update Patient details as Admin
router.put('/patient/:id', async (req, res) => {
  try {
    const { childName, age, gender, clinic, parentName, contact, assignedDoctor } = req.body;
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient profile not found' });

    if (childName !== undefined) patient.childName = childName;
    if (age !== undefined) patient.age = Number(age);
    if (gender !== undefined) patient.gender = gender;
    if (clinic !== undefined) patient.clinic = clinic;
    if (parentName !== undefined) patient.parentName = parentName;
    if (contact !== undefined) patient.contact = contact;
    if (assignedDoctor !== undefined) patient.assignedDoctor = assignedDoctor || null;

    await patient.save();

    if (childName && patient.user) {
      await User.findByIdAndUpdate(patient.user, { name: childName });
    }

    const updated = await Patient.findById(req.params.id)
      .populate('user', 'name email role')
      .populate({ path: 'assignedDoctor', populate: { path: 'user', select: 'name email' } });

    res.json({ message: 'Patient updated successfully', patient: updated });
  } catch (error) {
    console.error('Error updating patient:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update Doctor details as Admin
router.put('/doctor/:id', async (req, res) => {
  try {
    const { fullName, specialization, qualification, experience, clinic, contact } = req.body;
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    if (fullName !== undefined) doctor.fullName = fullName;
    if (specialization !== undefined) doctor.specialization = specialization;
    if (qualification !== undefined) doctor.qualification = qualification;
    if (experience !== undefined) doctor.experience = Number(experience);
    if (clinic !== undefined) doctor.clinic = clinic;
    if (contact !== undefined) doctor.contact = contact;

    await doctor.save();

    if (fullName && doctor.user) {
      await User.findByIdAndUpdate(doctor.user, { name: fullName });
    }

    const updated = await Doctor.findById(req.params.id).populate('user', 'name email role');
    res.json({ message: 'Doctor updated successfully', doctor: updated });
  } catch (error) {
    console.error('Error updating doctor:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete user as Admin
router.delete('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await Patient.deleteMany({ user: user._id });
    await Doctor.deleteMany({ user: user._id });
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
