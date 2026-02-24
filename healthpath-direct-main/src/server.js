import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import aiRouter from './routes/ai.routes.js';
import authRouter from './routes/auth.routes.js';
import { connectDB, getDBStatus } from './config/db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/ai', aiRouter);

app.get('/api/health', (req, res) => {
  const db = getDBStatus();

  res.json({
    status: 'ok',
    database: db,
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Not found',
    },
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Avoid leaking stack traces to clients
  // Log minimal error information on the server
  console.error('Unhandled error:', err.message);

  const status = err.statusCode || err.status || 500;

  res.status(status).json({
    error: {
      message: status === 500 ? 'Internal server error' : err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`API server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();

