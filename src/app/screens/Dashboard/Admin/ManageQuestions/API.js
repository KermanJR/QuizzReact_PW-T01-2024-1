import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchQuestions = async () => {
  const response = await API.get("/questions");
  return response.data;
};

export const addQuestion = async (questionData) => {
  const token = localStorage.getItem("token");
  const response = await API.post("/questions", questionData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateQuestion = async (id, questionData) => {
  const token = localStorage.getItem("token");
  const response = await API.put(`/questions/${id}`, questionData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteQuestion = async (id) => {
  const token = localStorage.getItem("token");
  await API.delete(`/questions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
