import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Button, Grid, Container, Box } from '@mui/material';
import ContainerTemp from '@/app/components/Container/ContainerTemp';
import styles from './Category.module.css';
import Image from 'next/image';
import LogoQuizz from '../../../../public/images/quizz_logo.png';
import { fetchQuizzesByCategory } from './API' 

const CategorySelection = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchQuizzes();
  }, [selectedCategory]);

  const fetchQuizzes = async () => {
    try {
      const quizzes = await fetchQuizzesByCategory(selectedCategory);
      console.log(quizzes)
      setQuizzes(quizzes);
    } catch (error) {
      console.error(error.message);
    }
  };


  const goToInit = () => {
    router.push('/dashboard');
  };

  const handleStartQuiz = (quizId) => {
    router.push(`/quiz/${quizId}`);
  };

  return (
    <ContainerTemp>
      <Container className={styles.container__cat}>
        <Image src={LogoQuizz.src} width={100} height={90} className={styles.image__cat} />
        <Typography variant="h3" align="center" gutterBottom className={styles.title__cat}>
          Selecione o Quiz
        </Typography>
          <Box>
            <Grid className={styles.list__cat}>
              {quizzes.map((quiz) => (
                <Grid key={quiz._id} item xs={12} >
                  <Button
                    className={styles.list__btn}
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handleStartQuiz(quiz._id)}
                    fullWidth
                  >
                    {quiz.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
            
          </Box>
          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '260px'}}>
          <Button variant="contained" style={{background: '#1134A3', height: '35px', }} onClick={goToInit} >
            Voltar ao início
          </Button>
        </Box>
       
    
      </Container>
      
    </ContainerTemp>
  );
};

export default CategorySelection;
