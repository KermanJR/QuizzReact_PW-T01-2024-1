import React from "react";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import styles from "./Home.module.css";
import Container from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Box className={styles.login__box}>
        <Typography variant="h1" align="center" gutterBottom>
          Bem-vindo ao Quiz App
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <Link href="/login" passHref>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "1rem" }}
            >
              Cadastro
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
