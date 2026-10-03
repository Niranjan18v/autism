import express from 'express';
import Message from '../models/Message.js';
import User from '../models/User.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// GET /api/messages/conversation?userId=A&otherUserId=B
// Returns full conversation between two users, marks messages as read
router.get('/conversation', async (req, res) => {
  const { userId, otherUserId } = req.query;
  if (!userId || !otherUserId) return res.status(400).json({ message: 'userId and otherUserId required' });
  try {
    const msgs = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'name role')
      .populate('receiver', 'name role');

    // Mark incoming messages as read
    await Message.updateMany(
      { sender: otherUserId, receiver: userId, read: false },
      { read: true }
    );

    res.json(msgs);
  } catch (err) {
    console.error('Error fetching conversation:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/messages/send
// Body: { senderId, receiverId, text }
router.post('/send', async (req, res) => {
  const { senderId, receiverId, text } = req.body;
  if (!senderId || !receiverId || !text?.trim()) {
    return res.status(400).json({ message: 'senderId, receiverId and text are required' });
  }
  try {
    const msg = await Message.create({ sender: senderId, receiver: receiverId, text: text.trim() });
    const populated = await Message.findById(msg._id)
      .populate('sender', 'name role')
      .populate('receiver', 'name role');
    res.status(201).json(populated);
  } catch (err) {
    console.error('Error sending message:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/messages/inbox/:userId
// Returns all unique conversations for a doctor (list of patients who messaged them)
router.get('/inbox/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get all messages where this user is sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'name role')
      .populate('receiver', 'name role');

    // Build unique conversation list (latest message per conversation partner)
    const conversations = {};
    for (const msg of messages) {
      const otherUser = msg.sender._id.toString() === userId ? msg.receiver : msg.sender;
      const otherId = otherUser._id.toString();
      if (!conversations[otherId]) {
        const unreadCount = await Message.countDocuments({
          sender: otherId, receiver: userId, read: false
        });
        conversations[otherId] = {
          user: otherUser,
          lastMessage: msg.text,
          lastTime: msg.createdAt,
          unread: unreadCount,
        };
      }
    }

    res.json(Object.values(conversations));
  } catch (err) {
    console.error('Error fetching inbox:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/messages/doctor-for-patient/:patientUserId
// Returns the assigned doctor's user ID for a patient
router.get('/doctor-for-patient/:patientUserId', async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.params.patientUserId })
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'user', select: 'name email role' }
      });

    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (!patient.assignedDoctor) return res.status(404).json({ message: 'No doctor assigned' });

    res.json({
      doctorUserId: patient.assignedDoctor.user._id,
      doctorName: patient.assignedDoctor.user.name,
      specialization: patient.assignedDoctor.specialization || 'Specialist',
    });
  } catch (err) {
    console.error('Error fetching doctor for patient:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
