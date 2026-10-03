import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  // 1. Try MongoDB Atlas (Cloud)
  if (uri) {
    try {
      console.log('🔄 Connecting to MongoDB Atlas...');
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 3000,
        socketTimeoutMS: 45000,
      });
      console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
      return;
    } catch (atlasErr) {
      console.warn(`⚠️ MongoDB Atlas IP/Connection issue: ${atlasErr.message}`);
      console.warn('👉 Switching to resilient local/memory database fallback...');
    }
  }

  // 2. Try Local MongoDB instance
  try {
    const localUri = 'mongodb://127.0.0.1:27017/autism_db';
    console.log(`🔄 Attempting connection to Local MongoDB (${localUri})...`);
    const conn = await mongoose.connect(localUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`✅ Local MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (localErr) {
    console.warn(`⚠️ Local MongoDB not active: ${localErr.message}`);
  }

  // 3. Guaranteed Fallback: MongoMemoryServer (runs embedded in Node.js)
  try {
    console.log('🔄 Launching embedded In-Memory MongoDB server...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ In-Memory MongoDB Connected: ${mongoUri}`);
  } catch (memErr) {
    console.error('❌ Could not start in-memory MongoDB fallback:', memErr.message);
  }
};

export default connectDB;
