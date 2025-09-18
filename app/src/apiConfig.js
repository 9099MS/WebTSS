const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://webtss-1.onrender.com' // 예: https://my-api.com
  : 'http://localhost:3001';

export default API_BASE_URL;
