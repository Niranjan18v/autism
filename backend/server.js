import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import patientRoutes from './routes/patient.js';
import doctorRoutes from './routes/doctor.js';
import adminRoutes from './routes/admin.js';
import messageRoutes from './routes/messages.js';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env - works both locally (root .env) and on Render (backend/.env)
dotenv.config({ path: path.join(__dirname, '.env') });
// Fallback: also try one level up (local dev monorepo root)
if (!process.env.MONGO_URI) {
  dotenv.config({ path: path.join(__dirname, '..', '.env') });
}

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'https://niranjan18v.github.io',            // GitHub Pages
  process.env.FRONTEND_URL,                   // custom domain (optional)
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());

// Database connection check middleware
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'MongoDB Connection Failed: Your IP address is not whitelisted on MongoDB Atlas. Please go to cloud.mongodb.com -> Network Access -> Add IP Address (0.0.0.0/0).'
    });
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'AURA API is running ✅', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AURA Server running on http://localhost:${PORT}`);
});

