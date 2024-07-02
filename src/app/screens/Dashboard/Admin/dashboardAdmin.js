import React, { useContext } from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./DashboardAdmin.module.css";
import ContainerTemp from "@/app/components/Container/ContainerTemp";
import Image from "next/image";
import LogoQuizz from "../../../../../public/images/quizz_logo.png";
import { UserContext } from "@/app/Context/Context";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";

const DashboardAdmin = () => {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();

  const goToManageQuizzes = () => {
    router.push("admin/manage-quizzes");
  };

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
          Dashboard Admin
        </Typography>
        {user && (
          <Typography variant="h3" className={styles.user__info}>
            Admin: {user.name}
          </Typography>
        )}
        <Box className={styles.links}>
          <Button
            variant="contained"
            color="primary"
            className={styles.dash_btn}
            onClick={goToManageQuizzes}
          >
            Gerenciar Quizzes
          </Button>
          <Link href="/perfil" passHref>
            <Button
              variant="contained"
              color="secondary"
              className={styles.dash_btn}
            >
              Meu Perfil
            </Button>
          </Link>
        </Box>
      </Container>
    </ContainerTemp>
  );
};

export default DashboardAdmin;
