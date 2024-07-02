import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  fetchQuestions,
  createQuiz,
  fetchQuizzes,
  updateQuiz,
  deleteQuiz,
} from "./API";
import { toast } from "react-toastify";
import { Edit, Delete } from "@mui/icons-material";
import styles from "./CreateQuizz.module.css";
import Link from "next/link";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizTopic, setQuizTopic] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [open, setOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const topics = [
    "Geografia",
    "Matemática",
    "História",
    "Cinema",
    "Carros",
    "Artes",
    "Tecnologia",
    "Ciência",
  ];

  useEffect(() => {
    fetchAllQuestions();
    fetchAllQuizzes();
  }, []);

  const fetchAllQuestions = async () => {
    const data = await fetchQuestions();
    setQuestions(data);
  };

  const fetchAllQuizzes = async () => {
    const data = await fetchQuizzes();
    setQuizzes(data);
  };

  const handleCreateQuiz = async () => {
    if (
      !quizTitle ||
      !quizTopic ||
      !difficulty ||
      selectedQuestions.length === 0
    ) {
      toast.error(
        "Por favor, preencha todos os campos e selecione ao menos uma pergunta."
      );
      return;
    }

    const quizData = {
      title: quizTitle,
      topic: quizTopic,
      questions: selectedQuestions,
      difficulty: difficulty,
    };

    try {
      if (editingQuiz) {
        await updateQuiz(editingQuiz._id, quizData);
        toast.success("Quiz atualizado com sucesso!");
      } else {
        await createQuiz(quizData);
        toast.success("Quiz criado com sucesso!");
      }
      setQuizTitle("");
      setQuizTopic("");
      setSelectedQuestions([]);
      setDifficulty("");
      setOpen(false);
      fetchAllQuizzes();
    } catch (error) {
      toast.error("Erro ao criar ou atualizar o quiz.");
    }
  };

  const handleToggleQuestion = (question) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== question));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleEditQuiz = (quiz) => {
    setQuizTitle(quiz.title);
    setQuizTopic(quiz.topic);
    setSelectedQuestions(quiz.questions);
    setDifficulty(quiz.difficulty);
    setEditingQuiz(quiz);
    setOpen(true);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await deleteQuiz(quizId);
      toast.success("Quiz deletado com sucesso!");
      fetchAllQuizzes();
    } catch (error) {
      toast.error("Erro ao deletar o quiz.");
    }
  };

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <Typography variant="h5" gutterBottom color="white">
          Quizzes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditingQuiz(null);
            setOpen(true);
          }}
        >
          Adicionar Quiz
        </Button>
      </Box>

      {quizzes.length === 0 ? (
        <List
          className={styles.container__question__quizz}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            align="center"
            color="white"
            style={{ marginTop: "0", color: "black" }}
          >
            Não há quizzes disponíveis.
          </Typography>
        </List>
      ) : (
        <List className={styles.container__question__quizz}>
          {quizzes.map((quiz) => (
            <ListItem
              divider
              key={quiz._id}
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <ListItemText
                primary={quiz.title}
                secondary={`Dificuldade: ${quiz.difficulty}`}
              />
              <Box>
                <IconButton onClick={() => handleEditQuiz(quiz)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteQuiz(quiz._id)}>
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className={styles.container__quizz__perg}>
          {editingQuiz ? "Editar Quiz" : "Criar Quiz"}
        </DialogTitle>
        <DialogContent className={styles.container__quizz__perg}>
          <TextField
            fullWidth
            margin="normal"
            label="Título do Quiz"
            value={quizTitle}
            style={{ background: "white", borderRadius: "4px" }}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Tópico</InputLabel>
            <Select
              value={quizTopic}
              style={{ background: "white", borderRadius: "4px" }}
              onChange={(e) => setQuizTopic(e.target.value)}
            >
              {topics.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Dificuldade</InputLabel>
            <Select
              style={{ background: "white", borderRadius: "4px" }}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <MenuItem value="Fácil">Fácil</MenuItem>
              <MenuItem value="Médio">Médio</MenuItem>
              <MenuItem value="Difícil">Difícil</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" gutterBottom style={{ marginTop: ".5rem" }}>
            Perguntas
          </Typography>
          <List style={{ overflowY: "scroll", height: "250px" }}>
            {questions.map((q) => (
              <ListItem
                key={q._id}
                button
                onClick={() => handleToggleQuestion(q._id)}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedQuestions.includes(q._id)}
                      style={{ color: "white" }}
                    />
                  }
                  label={q.question}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions className={styles.container__quizz__perg}>
          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            variant="contained"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreateQuiz}
            color="primary"
            variant="contained"
          >
            {editingQuiz ? "Atualizar" : "Criar"}
          </Button>
        </DialogActions>
      </Dialog>
      <Box className={styles.links}>
        <Link href="/dashboard/admin" passHref>
          <Button
            variant="contained"
            color="secondary"
            className={styles.quizz_btn}
          >
            Voltar
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CreateQuiz;
