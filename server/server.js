/**
 * Validation Engine – Express backend
 * -------------------------------------------------
 * This file now **exports** the Express app without starting
 * an HTTP server when it is imported (required for Vercel
 * server‑less functions). When you run it directly with
 * `node server.js` (local development) it will still start
 * listening on the configured port.
 * -------------------------------------------------
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// DB & middleware imports
import { connectDB } from './utils/db.js';
import { networkTrackerMiddleware } from './middleware/networkTracker.js';
import { httpInspectorMiddleware } from './middleware/httpInspectorMiddleware.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

// Route imports
import healthRoutes from './routes/healthRoutes.js';
import validationRoutes from './routes/validationRoutes.js';
import regexRoutes from './routes/regexRoutes.js';
import automataRoutes from './routes/automataRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import ruleRoutes from './routes/ruleRoutes.js';
import httpInspectionRoutes from './routes/httpInspectionRoutes.js';

// ------------------------------------------------------------------
// Basic path helpers (needed for serving the static client in prod)
// ------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------------------------------------------
// Local development settings only. Render supplies production environment
// variables directly, so the local backend.env file is never loaded there.
// ------------------------------------------------------------------
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, 'backend.env') });
  dotenv.config();
}

// ------------------------------------------------------------------
// Express app setup
// ------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 10000 : 5000);
const CLIENT_URL = process.env.CLIENT_URL || (
  process.env.NODE_ENV === 'production'
    ? 'https://validation-engine-cookie-oymy.vercel.app'
    : 'http://localhost:5173'
);

// 1️⃣ Core middle‑wares & CORS Configuration (Render -> Vercel)
const developmentOrigins = process.env.NODE_ENV === 'production' ? [] : [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
];
const configuredOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS || '').split(','),
  ...developmentOrigins,
].filter(Boolean).map(url => url.trim().replace(/\/$/, ''));
const allowedOrigins = [...new Set(configuredOrigins)];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Render health checks)
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.replace(/\/$/, '');
      if (allowedOrigins.includes(cleanOrigin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('Origin is not allowed by CORS.'));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 2️⃣ Logging & network‑tracking
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(networkTrackerMiddleware);
app.use(httpInspectorMiddleware);

// Vercel imports this module instead of running the local startup block below.
// Connect lazily for routes that use MongoDB, while preserving the in-memory
// fallback when no database URI is configured or MongoDB is temporarily down.

// 3️⃣ Mount API routes (all under /api)
app.use('/api/health', healthRoutes);
app.use('/api/validate', validationRoutes);
app.use('/api/regex', regexRoutes);
app.use('/api/automata', automataRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/rules', ruleRoutes);
app.use('/api', httpInspectionRoutes);

// 5️⃣ Serve static client assets when running in production
const distPath = path.join(__dirname, '../client/dist');
if (process.env.NODE_ENV === 'production' && existsSync(distPath)) {
  app.use(express.static(distPath));

  // All non‑API routes should return the SPA entry point
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next(); // let the API router handle it
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// The API server's root remains useful when no frontend build is present
// (for example, when deployed as a standalone Vercel backend project).
app.get('/', (req, res) => {
  res.json({
    name: 'Web Form Input Validation Engine (Regex & DFA) API',
    version: '1.0.0',
    documentation: '/api/health',
    status: 'online',
  });
});

// 6️⃣ Error‑handling middle‑wares
app.use(notFoundHandler);
app.use(errorHandler);

// ------------------------------------------------------------------
// Server start – only when this file is executed directly
// (i.e. `node server.js`). When Vercel imports the file it will
// skip this block and just use the exported Express app.
// ------------------------------------------------------------------

const isDirectExecution = process.argv[1]
  && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isDirectExecution && process.env.NODE_ENV !== 'test') {
  const startServer = async () => {
    const databaseConnected = await connectDB();
    if (!databaseConnected) {
      console.warn('[Startup] API is starting with MongoDB disconnected; health checks will report the database state.');
      const retryTimer = setInterval(async () => {
        if (mongoose.connection.readyState === 0) {
          await connectDB();
        }
      }, 30000);
      retryTimer.unref();
    }
    app.listen(PORT, '0.0.0.0', () => {
      console.log('====================================================');
      console.log(`🚀 Validation Engine Server running on port: ${PORT}`);
      console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🌐 Client Origin: ${CLIENT_URL}`);
      console.log('====================================================');
    });
  };

  startServer().catch((error) => {
    console.error('Failed to start the validation engine server:', error);
    process.exitCode = 1;
  });
}

// Export the app for Vercel’s server‑less wrapper
export default app;
