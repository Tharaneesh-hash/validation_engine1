import axios from 'axios';

// Create central Axios instance with trailing slash normalization
const configuredBaseURL = import.meta.env.VITE_API_URL?.trim();
const rawBaseURL = configuredBaseURL || (import.meta.env.DEV ? '/api' : '');

if (!rawBaseURL) {
  throw new Error('VITE_API_URL must point to the deployed Render API, including /api.');
}

const baseURL = rawBaseURL.replace(/\/+$/, '');

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: measure start time for Computer Networks latency calculation
api.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: performance.now() };
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: measure round-trip latency
api.interceptors.response.use(
  (response) => {
    const start = response.config.metadata?.startTime || performance.now();
    const duration = performance.now() - start;
    response.latencyMs = parseFloat(duration.toFixed(2));
    return response;
  },
  (error) => {
    if (error.config?.metadata) {
      error.latencyMs = parseFloat((performance.now() - error.config.metadata.startTime).toFixed(2));
    }
    return Promise.reject(error);
  }
);

const API_URL = import.meta.env.VITE_API_URL;

export const checkAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);

    const data = await response.json();

    console.log("API Health:", data);

    return data;
  } catch (error) {
    console.error("API connection failed:", error);
    return null;
  }
};

export default api;
