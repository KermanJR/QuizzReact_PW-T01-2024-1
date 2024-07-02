import React, { useState, useContext } from "react";
import { Typography, Button, Box, TextField } from "@mui/material";
import { Container } from "@mui/material";
import Image from "next/image";
import LogoQuizz from "../../../../public/images/quizz_logo.png";
import { UserContext } from "@/app/Context/Context";
import ContainerTemp from "@/app/components/Container/ContainerTemp";
import styles from "./Perfil.module.css";
import { updateUser } from "./API";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Perfil = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    const updatedUser = {
      name,
      email,
      password: password ? password : undefined,
    };

    try {
      const updatedUserData = await updateUser(user._id, updatedUser);
      setUser(updatedUserData);
      toast.success("Dados atualizados com sucesso!");
      console.log("Dados do usuário atualizados:", updatedUserData);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
      if (
        error.message.includes("User already exists") ||
        error.message.includes("Este endereço de e-mail já está em uso.")
      ) {
        toast.error(
          "Nome de usuário ou e-mail já estão em uso. Por favor, escolha outro."
        );
      }
    }
  };

  const goToInit = () => {
    if (user.isAdmin) {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/player");
    }
  };

  return (
    <ContainerTemp>
      <Container className={styles.container__perfil}>
        <Image
          src={LogoQuizz.src}
          width={100}
          height={90}
          className={styles.image__perfil}
        />
        <Typography variant="h1" className={styles.title__perfil}>
          Meu Perfil
        </Typography>
        {user && (
          <>
            <Typography variant="h3" className={styles.title__perfil}>
              Jogador: {user.name}
            </Typography>
            <Box component="form" className={styles.form__perfil}>
              <TextField
                className={styles.textField__perfil}
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                className={styles.textField__perfil}
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Senha"
                className={styles.textField__perfil}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                className={styles.textField__perfil}
                label="Confirmar Senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                fullWidth
              >
                Salvar Alterações
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={goToInit}
                fullWidth
              >
                Voltar ao início
              </Button>
            </Box>
          </>
        )}
      </Container>
    </ContainerTemp>
  );
};

export default Perfil;
