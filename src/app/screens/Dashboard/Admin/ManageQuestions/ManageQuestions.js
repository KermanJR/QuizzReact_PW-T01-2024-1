import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import {
  fetchQuestions,
  deleteQuestion,
  addQuestion,
  updateQuestion,
} from "./API";
import styles from "./Manage.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState("");

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    const data = await fetchQuestions();
    setQuestions(data);
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      fetchAllQuestions();
      toast.success("Pergunta deletada com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar a pergunta.");
    }
  };

  const handleAddQuestion = async () => {
    const questionData = {
      question: newQuestion,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
    };
    try {
      await addQuestion(questionData);
      fetchAllQuestions();
      setOpen(false);
      toast.success("Pergunta adicionada com sucesso!");
    } catch (error) {
      toast.error("Erro ao adicionar a pergunta.");
    }
  };

  const handleEditQuestion = (question) => {
    setEditing(true);
    setCurrentQuestion(question);
    setNewQuestion(question.question);
    setNewOptions(question.options);
    setNewCorrectAnswer(question.correctAnswer);
    setOpen(true);
  };

  const handleUpdateQuestion = async () => {
    const updatedQuestion = {
      question: newQuestion,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
    };
    try {
      await updateQuestion(currentQuestion._id, updatedQuestion);
      fetchAllQuestions();
      setOpen(false);
      setEditing(false);
      setCurrentQuestion(null);
      toast.success("Pergunta atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar a pergunta.");
    }
  };

  return (
    <Box className={styles.container__question}>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h5" gutterBottom style={{ color: "white" }}>
          Questões
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditing(false);
            setOpen(true);
          }}
          startIcon={<AddIcon />}
        >
          Adicionar Pergunta
        </Button>
      </Box>

      <List className={styles.container__question__list}>
        {questions.map((q, i) => (
          <ListItem key={q._id} divider>
            <ListItemText
              className={styles.container__question__list__text}
              primary={`${i} - ${q.question}`}
              secondary={`Opções: ${q.options.join(", ")}`}
            />
            <Box>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditQuestion(q)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(q._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className={styles.container__question__perg}>
          {editing ? "Editar Pergunta" : "Adicionar Pergunta"}
        </DialogTitle>
        <DialogContent className={styles.container__question__perg}>
          <TextField
            autoFocus
            margin="dense"
            label="Pergunta"
            fullWidth
            className={styles.container__question__text}
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ color: "white", paddingTop: "1rem" }}
            >
              Opções
            </FormLabel>
            <RadioGroup
              aria-label="correct-answer"
              name="correct-answer-group"
              value={newCorrectAnswer}
              onChange={(e) => setNewCorrectAnswer(e.target.value)}
              row
            >
              {newOptions.map((option, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                    width: "100%",
                  }}
                >
                  <FormControlLabel
                    value={String(index)}
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": { color: "white" },
                        }}
                      />
                    }
                    color="white"
                  />
                  <TextField
                    margin="dense"
                    label={`Opção ${index + 1}`}
                    fullWidth
                    value={option}
                    className={styles.container__question__text}
                    onChange={(e) => {
                      const newOpts = [...newOptions];
                      newOpts[index] = e.target.value;
                      setNewOptions(newOpts);
                    }}
                    sx={{ flexGrow: 1 }}
                  />
                </Box>
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions
          className={styles.container__question__perg}
          style={{ marginTop: "-1rem", padding: "1rem 1.5rem" }}
        >
          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            variant="contained"
          >
            Cancelar
          </Button>
          <Button
            onClick={editing ? handleUpdateQuestion : handleAddQuestion}
            color="primary"
            variant="contained"
          >
            {editing ? "Atualizar" : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Box className={styles.links}>
        <Link href="/dashboard/admin" passHref>
          <Button
            variant="contained"
            color="secondary"
            className={styles.manage_btn}
          >
            Voltar
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ManageQuestions;
