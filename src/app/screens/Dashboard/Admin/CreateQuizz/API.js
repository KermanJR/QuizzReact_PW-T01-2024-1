import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const createQuiz = async (quizData) => {
  const response = await API.post('/quizzes', quizData);
  return response.data;
};

export const fetchQuizzes = async () => {
  const response = await API.get('/quizzes');
  return response.data;
};

export const fetchQuizById = async (id) => {
  const response = await API.get(`/quizzes/${id}`);
  return response.data;
};

export const deleteQuiz = async (id) => {
  await API.delete(`/quizzes/${id}`);
};

export const fetchQuestions = async () => {
  const response = await API.get('/questions');
  return response.data;
};

export const updateQuiz = async (id, quizData) => {
  const response = await API.put(`/quizzes/${id}`, quizData);
  return response.data;
};
