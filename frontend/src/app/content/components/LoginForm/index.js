import styles from './Login.module.css';
import LogoNext from '../../../../public/images/logo-quiz.png'
import Image from 'next/image';
import Link from 'next/link';
import { UserContext } from '@/app/context/UserContext';
import { useContext } from 'react';
import { useEffect } from 'react';

export default function LoginForm(){

    const {
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        login
    } = useContext(UserContext);
    

    console.log(email)
    function handleSubmit(e){
        e.preventDefault();
        try{
            login()
        }catch(err){
            console.log(err)
        }
    }

    return(
        <main className={styles._content}>
            <div className={styles.content__logo}>
                <Image src={LogoNext.src} width={120} height={120} className={styles._logo}/>
            </div>
            <form className={styles._form} onSubmit={handleSubmit}>
                <div>
                    <label className={styles._label}>E-mail</label>
                    <input 
                        required 
                        className={styles._input} 
                        type="email" 
                        placeholder="Insira seu e-mail"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className={styles._label}>Senha</label>
                    <input 
                        required 
                        onChange={(e)=>setPassword(e.target.value)}
                        className={styles._input} 
                        type="password" 
                        placeholder="Insira sua senha"
                    />
                </div>
                <div>
                    <button className={styles._button} type="submit">Enviar</button>
                </div>
                <div>
                    <Link className={styles._link} href="/register">Não possui cadastro? Crie uma conta</Link>
                </div>
            </form>
            
        </main>
    )
}