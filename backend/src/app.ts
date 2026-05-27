import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import userRoutes from './routes/user.routes';
import { errorHandler, notFound } from './middlewares/error.middleware';

const app: Application = express();

// CORS Configuration - Handle trailing slashes properly
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Remove trailing slash if present
const normalizedOrigin = corsOrigin.replace(/\/$/, '');

console.log('🔐 CORS Origin configured:', normalizedOrigin);

// Multiple allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  normalizedOrigin,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        return callback(null, true);
      }

      // Normalize the incoming origin (remove trailing slash)
      const normalizedIncomingOrigin = origin.replace(/\/$/, '');

      // Check if the normalized origin is allowed
      const isAllowed = allowedOrigins.some(
        (allowed) => allowed.replace(/\/$/, '') === normalizedIncomingOrigin
      );

      if (isAllowed) {
        console.log('✅ CORS allowed for origin:', origin);
        callback(null, true);
      } else {
        console.log('❌ CORS blocked for origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400, // 24 hours
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    cors: normalizedOrigin,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;