import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });

    console.log('Connected to DB:', mongoose.connection.name);
    console.log('Mongo Host:', mongoose.connection.host);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
}

export function getDBStatus() {
  const state = mongoose.connection.readyState;

  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  return {
    readyState: state,
    status: states[state] || 'unknown',
  };
}


