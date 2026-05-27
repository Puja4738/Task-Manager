import { createServer } from 'http';
import dotenv from 'dotenv';
import app from './app';
import { connectDatabase } from './config/database';
import { initializeSocket } from './config/socket';

dotenv.config();

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

initializeSocket(httpServer);

const startServer = async () => {
  try {
    await connectDatabase();

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err.message);
  httpServer.close(() => process.exit(1));
});