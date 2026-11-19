import os from 'os';
import { getDBStatus } from '../utils/db.js';
import { networkStats } from '../middleware/networkTracker.js';

export const getHealth = (req, res) => {
  const memoryUsage = process.memoryUsage();
  const database = getDBStatus();

  const healthData = {
    status: database.state === 'connected' ? 'healthy' : 'degraded',
    message: 'Regex & DFA Validation Engine API is running smoothly.',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    server: {
      runtime: 'Node.js',
      version: process.version,
      platform: os.platform(),
      arch: os.arch(),
      cpuCount: os.cpus().length,
      freeMemoryMB: (os.freemem() / (1024 * 1024)).toFixed(2),
      totalMemoryMB: (os.totalmem() / (1024 * 1024)).toFixed(2),
      processMemoryUsageMB: {
        rss: (memoryUsage.rss / (1024 * 1024)).toFixed(2),
        heapTotal: (memoryUsage.heapTotal / (1024 * 1024)).toFixed(2),
        heapUsed: (memoryUsage.heapUsed / (1024 * 1024)).toFixed(2)
      }
    },
    database,
    network: networkStats.getMetrics()
  };

  res.status(database.state === 'connected' ? 200 : 503).json({
    success: true,
    data: healthData
  });
};
