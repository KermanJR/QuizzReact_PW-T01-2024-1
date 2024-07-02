import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchQuizById = async (id) => {
  try {
    const response = await API.get(`/quizzes/${id}`);
    console.log(response);
    return response.data.quiz;
  } catch (error) {
    throw new Error(
      `Erro ao buscar quiz: ${
        error.response ? error.response.data.error : error.message
      }`
    );
  }
};

export const postScore = async (user, quiz, score) => {
  try {
    const response = await API.post("/scores", {
      user: user,
      quiz: quiz,
      score: score,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar os pontos:", error);
    throw new Error("Erro ao enviar os pontos");
  }
};
