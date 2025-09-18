const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '여기에_실제_배포된_백엔드_주소_입력' // 예: https://my-api.com
  : 'http://localhost:3001';

export default API_BASE_URL;
