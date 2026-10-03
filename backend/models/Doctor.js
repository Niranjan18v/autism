import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  specialization: { type: String, required: true },
  qualification: { type: String },
  experience: { type: Number },
  clinic: { type: String, required: true },
  contact: { type: String, required: true },
  licenseNumber: { type: String },
  imageUrl: { type: String }, // optional profile image
  bio: { type: String }
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
