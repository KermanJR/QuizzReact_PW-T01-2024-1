import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import { fetchQuizById, postScore } from "./API";
import styles from "./Quiz.module.css";
import ContainerTemp from "@/app/components/Container/ContainerTemp";
import { UserContext } from "@/app/Context/Context";
import LogoQuizz from "../../../../public/images/quizz_logo.png";
import Image from "next/image";
import { toast } from "react-toastify";
import confetti from "canvas-confetti"; // Importa a biblioteca

const QuizPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [quizPoints, setQuizPoints] = useState(0);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const fetchedQuiz = await fetchQuizById(id);
      setQuiz(fetchedQuiz);
    } catch (error) {
      console.error("Erro ao buscar o quiz:", error.message);
    }
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    const correctAnswer = quiz.questions[currentQuestion].correctAnswer;
    const isCorrect = optionIndex === correctAnswer;

    setIsAnswerCorrect(isCorrect);
    setAnswerFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setQuizPoints((prevPoints) => prevPoints + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion === quiz.questions.length - 1) {
      setQuizCompleted(true);
      postFinalScore();
      launchConfetti();
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setAnswerFeedback(null);
    }
  };

  const postFinalScore = async () => {
    try {
      await postScore(user._id, quiz._id, quizPoints);
      toast.success("Pontuação enviada com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar a pontuação.");
    }
  };

  const handleRestartQuiz = () => {
    router.push(`/quiz/${id}`);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setQuizPoints(0);
  };

  const goToInit = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    if (quizCompleted) {
      router.push(`/ranking?score=${quizPoints}&quizId=${quiz._id}`);
    }
  }, [quizCompleted]);

  if (!quiz) {
    return <Typography>Carregando...</Typography>;
  }

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <ContainerTemp>
      <Container className={styles.container__quiz}>
        <Image
          src={LogoQuizz.src}
          width={100}
          height={90}
          className={styles.image__quiz}
        />
        <Typography variant="h4" className={styles.quiz__title}>
          {quiz.title}
        </Typography>
        <List>
          <ListItem className={styles.quiz__item}>
            <ListItemText
              primary={`Q${currentQuestion + 1}: ${
                currentQuestionData.question
              }`}
              primaryTypographyProps={{ className: styles.quiz__text }}
              secondary={currentQuestionData.options.map((option, i) => (
                <Box className={styles.quiz__options} key={i}>
                  <Button
                    variant="contained"
                    fullWidth
                    className={
                      selectedAnswer === i
                        ? answerFeedback === "correct"
                          ? styles.correct__option
                          : styles.incorrect__option
                        : styles.option__button
                    }
                    onClick={() => handleAnswerSelect(i)}
                  >
                    {String.fromCharCode(65 + i)}. {option}
                  </Button>
                </Box>
              ))}
            />
          </ListItem>
        </List>

        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRestartQuiz}
            fullWidth
          >
            Reiniciar Quiz
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={goToInit}
            fullWidth
          >
            Voltar ao início
          </Button>
        </Box>
      </Container>
    </ContainerTemp>
  );
};

export default QuizPage;
