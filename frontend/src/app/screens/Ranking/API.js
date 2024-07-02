import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchRankingByQuiz = async (id) => {
  try {
    const response = await API.get(`/scores/rankings/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Erro ao buscar quiz: ${
        error.response ? error.response.data.error : error.message
      }`
    );
  }
};
