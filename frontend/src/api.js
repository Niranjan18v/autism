// Central API base URL
// In dev: http://localhost:5000 (from frontend/.env)
// In production: your Render URL (from frontend/.env.production)
const rawBase = import.meta.env.VITE_API_URL || '';
const API_BASE = rawBase.replace(/\/+$/, '');

export default API_BASE;

