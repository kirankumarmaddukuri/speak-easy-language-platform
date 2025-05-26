import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

export const fetchUserProfile = () => api.get('/auth/profile');

export const fetchLanguages = () => api.get('/languages');
export const fetchLanguageByName = (languageName) => api.get(`/languages/${languageName}`);

export const fetchQuizzesByLanguage = (languageId) => api.get(`/quizzes?language=${languageId}`);
export const fetchQuizByTopic = (quizId, topicName) => api.get(`/quizzes/${quizId}/topics/${topicName}`);

export const fetchDoubts = () => api.get('/doubts');
export const postDoubt = (doubtData) => api.post('/doubts', doubtData);

// User progress tracking APIs
export const updateUserProgress = (progress) => api.patch('/auth/profile/progress', { progress });

export default api;
