import { useContext, createContext } from 'react';
import { useState } from 'react'
import APIQUIZZ from '../api/API';

export const UserContext = createContext({
    email: '',
    password: '',
    name: ''
});

export default function UserProvider({children}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

   
    function register(){
        APIQUIZZ.register({
            name,
            email,
            password
        }).then(res=>{
            console.log(res)
        })
    }

    function login(){
        console.log(name, email)
        APIQUIZZ.login({
            email,
            password
        }).then(res=>{
            console.log(res)
        })
    }

    return (
        <UserContext.Provider value={{
            email,
            setEmail,
            name,
            setName,
            password,
            setPassword,
            login
        }}>
            {children}
        </UserContext.Provider>
    )
}