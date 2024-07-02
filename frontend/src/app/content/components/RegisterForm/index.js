import styles from './Register.module.css';
import LogoNext from '../../../../public/images/logo-quiz.png'
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterForm(){
    return(
        <main className={styles._content}>
            <div className={styles.content__logo}>
                <Image src={LogoNext.src} width={120} height={120} className={styles._logo}/>
            </div>
            <form className={styles._form}>
                <div>
                    <label className={styles._label}>Nome Completo</label>
                    <input className={styles._input} type="text" placeholder="Insira seu e-mail"/>
                </div>
                <div>
                    <label className={styles._label}>E-mail</label>
                    <input className={styles._input} type="text" placeholder="Insira seu e-mail"/>
                </div>
                <div>
                    <label className={styles._label}>Senha</label>
                    <input className={styles._input} type="text" placeholder="Insira sua senha"/>
                </div>
                <div>
                    <button className={styles._button}>Enviar</button>
                </div>
                <div>
                <Link  className={styles._link} href="/home">Já possui conta? Faça Login</Link>
                </div>
            </form>
            
        </main>
    )
}