import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
  Box,
} from "@mui/material";
import { fetchRankingByQuiz } from "./API";
import ContainerTemp from "@/app/components/Container/ContainerTemp";
import styles from "./Ranking.module.css";
import Image from "next/image";
import LogoQuizz from "../../../../public/images/quizz_logo.png";
import { FaCrown } from "react-icons/fa";

const Ranking = () => {
  const router = useRouter();
  const [players, setPlayers] = useState([]);

  const { quizId, score } = router.query;

  useEffect(() => {
    if (quizId) {
      fetchRanking();
    }
  }, [quizId]);

  const fetchRanking = async () => {
    try {
      const fetchedRanking = await fetchRankingByQuiz(quizId);
      setPlayers(fetchedRanking);
    } catch (error) {
      console.error("Erro ao buscar o ranking:", error.message);
    }
  };

  const handleRestartQuiz = () => {
    router.push(`/quiz/${quizId}`);
  };

  const goToInit = () => {
    router.push("/dashboard");
  };

  return (
    <ContainerTemp>
      <Container className={styles.container__ranking}>
        <Image
          src={LogoQuizz.src}
          width={100}
          height={90}
          className={styles.image__ranking}
        />
        <Typography variant="h4" className={styles.ranking__title}>
          Ranking
        </Typography>
        <Typography
          variant="h4"
          align="center"
          className={styles.ranking__subtitle}
        >
          Sua pontuação: {score} pontos
        </Typography>
        <List className={styles.list}>
          {players.map((player, index) => (
            <div key={index}>
              <ListItem className={styles.listItem}>
                <ListItemText
                  primary={
                    <span className={styles.player_name}>
                      {player.user.name}
                    </span>
                  }
                  secondary={`Pontuação: ${player.score}`}
                />
                {index === 0 && (
                  <FaCrown
                    className={styles.crown_icon}
                    style={{ fill: "#D4AA00" }}
                  />
                )}
                {index === 1 && (
                  <FaCrown
                    className={styles.crown_icon}
                    style={{ fill: "green" }}
                  />
                )}
                {index === 2 && (
                  <FaCrown
                    className={styles.crown_icon}
                    style={{ fill: "red" }}
                  />
                )}
              </ListItem>
              {index !== players.length - 1 && (
                <hr className={styles.separator} />
              )}
            </div>
          ))}
        </List>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            width: "100%",
            marginTop: "1rem",
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

export default Ranking;
