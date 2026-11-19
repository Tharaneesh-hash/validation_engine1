import mongoose from 'mongoose';

let lastConnectionError = null;

/**
 * Constructs and sanitizes the MongoDB connection URI, ensuring
 * production only uses the connection string supplied by Render.
 */
export const getCleanMongoURI = () => {
  let uri = process.env.MONGODB_URI || process.env.MONGO_URI || '';
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;

  if (username && password && uri) {
    const encodedUser = encodeURIComponent(username.trim());
    const encodedPass = encodeURIComponent(password.trim());

    if (uri.includes('<username>') || uri.includes('<password>')) {
      uri = uri.replace('<username>', encodedUser).replace('<password>', encodedPass);
    }
  }

  // Handle unencoded @ in password (e.g., mongodb+srv://user:pass@word@host)
  if (uri.startsWith('mongodb+srv://') || uri.startsWith('mongodb://')) {
    const prefix = uri.startsWith('mongodb+srv://') ? 'mongodb+srv://' : 'mongodb://';
    const rest = uri.substring(prefix.length);
    const lastAt = rest.lastIndexOf('@');
    if (lastAt !== -1) {
      const creds = rest.substring(0, lastAt);
      const hostPart = rest.substring(lastAt + 1);
      const colonIdx = creds.indexOf(':');
      if (colonIdx !== -1) {
        const u = creds.substring(0, colonIdx);
        const p = creds.substring(colonIdx + 1);
        uri = `${prefix}${encodeURIComponent(decodeURIComponent(u))}:${encodeURIComponent(decodeURIComponent(p))}@${hostPart}`;
      }
    }
  }

  if (!uri && process.env.NODE_ENV === 'production') {
    throw new Error('MONGODB_URI must be configured for production.');
  }

  if (
    uri &&
    process.env.NODE_ENV === 'production' &&
    /^mongodb(?:\+srv)?:\/\/(?:[^@/]+@)?(?:localhost|127\.0\.0\.1)(?=[:/]|$)/i.test(uri)
  ) {
    throw new Error('Production MONGODB_URI must point to a hosted database, not localhost.');
  }

  return uri || 'mongodb://127.0.0.1:27017/validation_engine';
};

export const connectDB = async () => {
  const uri = getCleanMongoURI();

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    });
    lastConnectionError = null;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    lastConnectionError = error.message;
    const safeError = error.message.replace(/(mongodb(?:\+srv)?:\/\/)[^\s@]+@/gi, '$1[redacted]@');
    console.warn(`[MongoDB] Unable to connect: ${safeError}`);
    console.warn('[MongoDB] Database-backed features will use their in-memory fallback until the database is available.');
    return false;
  }
};

export const getDBStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized'
  };
  return {
    state: states[mongoose.connection.readyState] || 'unknown',
    host: mongoose.connection.host || null,
    dbName: mongoose.connection.name || null,
    lastError: mongoose.connection.readyState === 1
      ? null
      : lastConnectionError?.replace(/(mongodb(?:\+srv)?:\/\/)[^\s@]+@/gi, '$1[redacted]@') || null
  };
};
