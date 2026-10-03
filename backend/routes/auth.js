import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// ─── LOGIN ───────────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password and role are required' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({ message: 'No account found with this email' });
    }

    let passwordMatch = false;
    if (user.password.startsWith('$2b$') || user.password.startsWith('$2a$')) {
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      passwordMatch = (password === user.password);
    }

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    if (user.role !== role) {
      return res.status(401).json({ message: `This account is registered as "${user.role}", not "${role}"` });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// ─── GET ALL DOCTORS ─────────────────────────────────────────────────────────
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('user', 'name email');
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error.message);
    res.status(500).json({ message: 'Error fetching doctors list' });
  }
});

// ─── REGISTER ─────────────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  const {
    name, email, password, role,
    // Patient fields
    childName, age, gender, clinic, parentName, relationship, contact, assignedDoctor,
    // Doctor fields
    fullName, specialization, qualification, experience, licenseNumber,
  } = req.body;

  // Basic validation
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password and role are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  if (!['patient', 'doctor', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name || (role === 'doctor' ? fullName : childName),
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    let profile = null;

    // Create Patient profile
    if (role === 'patient') {
      profile = await Patient.create({
        user: user._id,
        childName: childName || name,
        age: age ? Number(age) : undefined,
        gender,
        clinic,
        parentName,
        relationship,
        contact,
        assignedDoctor: assignedDoctor || null,
      });
    }

    // Create Doctor profile
    if (role === 'doctor') {
      profile = await Doctor.create({
        user: user._id,
        fullName: fullName || name,
        specialization,
        qualification,
        experience: experience ? Number(experience) : undefined,
        clinic,
        contact,
        licenseNumber,
      });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile,
    });
  } catch (error) {
    console.error('Register error:', error.message);
    // Handle Mongoose validation errors specifically
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error during registration: ' + error.message });
  }
});

// ─── SEED (testing only) ──────────────────────────────────────────────────────
router.post('/seed', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
