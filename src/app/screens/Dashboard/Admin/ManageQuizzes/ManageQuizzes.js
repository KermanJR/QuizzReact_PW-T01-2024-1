import React, { useState } from "react";
import { Typography, Box, Tabs, Tab, Container } from "@mui/material";
import ManageQuestions from "../ManageQuestions/ManageQuestions";
import CreateQuiz from "../CreateQuizz/CreateQuizz";
import styles from "./ManageQuizzes.module.css";
import ContainerTemp from "@/app/components/Container/ContainerTemp";

const ManageQuizzes = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <ContainerTemp>
      <Container className={styles.container__manage}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Gerenciar Perguntas" style={{ color: "white" }} />
          <Tab label="Criar Quiz" style={{ color: "white" }} />
        </Tabs>
        <Box className={styles.container__manage__QQ}>
          {tab === 0 && <ManageQuestions />}
          {tab === 1 && <CreateQuiz />}
        </Box>
      </Container>
    </ContainerTemp>
  );
};

export default ManageQuizzes;
