const API_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8000'
    : 'https://palm-reading-api.fly.dev');

export const endpoints = {
  dailyFortune: `${API_URL}/api/dailyFortune`,
  analyzePalm: `${API_URL}/api/analyzePalm`,
  analyzePalmImage: `${API_URL}/api/analyzePalmImage`,
}; 