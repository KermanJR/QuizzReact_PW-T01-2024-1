import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchQuizzesByCategory = async (category) => {
  try {
    const response = await API.get(`/quizzes`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar quizzes: ${error.response ? error.response.data.error : error.message}`);
  }
};

