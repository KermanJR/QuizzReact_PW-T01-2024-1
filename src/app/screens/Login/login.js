import React, { useState } from "react";
import { useRouter } from "next/router";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import styles from "./Login.module.css";
import ContainerForm from "@/app/components/ContainerForm/ContainerForm";
import { loginUser } from "./API";
import Link from "next/link";
import { useContext } from "react";
import { UserContext, UserProvider } from "@/app/Context/Context";
import Image from "next/image";
import LogoQuizz from "../../../../public/images/quizz_logo.png";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  const router = useRouter();
  const { setUser, user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      console.log(userData)
      toast.success("Login realizado com sucesso!");
      
  
      if (userData.isAdmin) {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/player");
      }
    } catch (error) {
      toast.error("E-mail ou senha inválido!");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <UserProvider>
      <ContainerForm>
        <Container maxWidth="xs" className={styles.container}>
          
          <Image
            src={LogoQuizz.src}
            width={100}
            height={90}
            className={styles.image__login}
          />
          <Typography variant="h6" align="center" gutterBottom className={styles.form__t1}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={styles.form__p}
                  fullWidth
                  type="email"
                  label="Email"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={styles.form__p}
                  fullWidth
                  type="password"
                  label="Senha"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  className={styles.form__btn}
                  fullWidth
                >
                  Entrar
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography color="white" style={{ fontSize: ".875rem" }}>
                  Não possui uma conta?
                  <Link href="/cadastro" style={{ color: "white" }}>
                    {` Cadastre-se`}
                  </Link>
                </Typography>
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </form>
        </Container>
      </ContainerForm>
    </UserProvider>
  );
};

export default Login;
