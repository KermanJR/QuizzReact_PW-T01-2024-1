import React, { use } from "react";
import Link from "next/link";
import { Typography, Button, Box } from "@mui/material";
import styles from "./DashboardPlayer.module.css";
import ContainerTemp from "@/app/components/Container/ContainerTemp";
import { Container } from "@mui/material";
import Image from "next/image";
import LogoQuizz from "../../../../../public/images/quizz_logo.png";
import { useContext } from "react";
import { UserContext } from "@/app/Context/Context";
import { BiLogOut } from "react-icons/bi";

const DashboardPlayer = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <ContainerTemp>
      <Container className={styles.container__dash}>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "end",
            marginTop: "-3rem",
          }}
        >
          <BiLogOut
            style={{
              width: "40px",
              height: "40px",
              fill: "whitesmoke",
              cursor: "pointer",
            }}
            onClick={logout}
          />
        </Box>
        <Image src={LogoQuizz.src} width={100} height={90} />
        <Typography variant="h1" className={styles.title__dash}>
          Dashboard
        </Typography>
        {user && (
          <Typography variant="h3" className={styles.user__info}>
            Jogador: {user.name}
          </Typography>
        )}
        <Box className={styles.links}>
          <Link href="/categoria" passHref>
            <Button
              variant="contained"
              color="primary"
              className={styles.dash_btn}
            >
              Iniciar Quiz
            </Button>
          </Link>
          <Link href="/perfil" passHref>
            <Button variant="contained" color="secondary">
              Meu Perfil
            </Button>
          </Link>
        </Box>
      </Container>
    </ContainerTemp>
  );
};

export default DashboardPlayer;
