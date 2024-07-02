import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import styles from './Register.module.css';
import ContainerForm from '@/app/components/ContainerForm/ContainerForm';
import registerUser from './API';
import Link from 'next/link';
import LogoQuizz from '../../../../public/images/quizz_logo.png';
import { toast } from 'react-toastify';
import Image from 'next/image';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(fullName, email, password);
      toast.success('Cadastro realizado com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error.message);
      if (error.message.includes('User already exists')) {
        toast.error('Nome de usuário ou e-mail já estão em uso. Por favor, escolha outro.');
      } else {
        toast.error('Erro ao cadastrar usuário. Por favor, tente novamente.');
      }
    }
  };

  return (
    <ContainerForm>
      <Container maxWidth="xs" className={styles.container}>
        <Image src={LogoQuizz.src} width={100} height={90} className={styles.image__register} />
        <Typography variant="h6" align="center" gutterBottom className={styles.form__t1}>
          Cadastro
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={styles.form__p}
                fullWidth
                type="text"
                label="Nome Completo"
                value={fullName}
                required={true}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={styles.form__p}
                fullWidth
                type="email"
                label="Email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={styles.form__p}
                fullWidth
                type="password"
                label="Senha"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" className={styles.form__btn} fullWidth>
                Cadastrar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography color="white" style={{ fontSize: '.875rem' }}>
                Já possui uma conta?{' '}
                <Link href="/login" style={{ color: 'white' }}>
                  Faça login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ContainerForm>
  );
};

export default Register;
