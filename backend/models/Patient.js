import mongoose from 'mongoose';
const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  childName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String },
  clinic: { type: String, required: true },
  parentName: { type: String, required: true },
  relationship: { type: String },
  contact: { type: String, required: true },
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  imageUrl: { type: String },
  dailyLogs: [{
    date: { type: Date, default: Date.now },
    notes: { type: String }
  }],
  communicationProgress: {
    currentDay: { type: Number, default: 1 },
    completedDays: [{ type: Number }],
    dayStats: [{
      day: { type: Number },
      accuracy: { type: Number, default: 0 },
      hintsUsed: { type: Number, default: 0 },
      turnsCount: { type: Number, default: 0 },
      lastPracticed: { type: Date, default: Date.now },
      status: { type: String, default: 'in-progress' }
    }]
  }
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
