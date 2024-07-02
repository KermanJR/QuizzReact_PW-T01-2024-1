
import React from 'react';
import { UserProvider } from '@/app/Context/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './global.css'
import { Quicksand } from 'next/font/google'
 

const quick = Quicksand({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  return (
    <main >
  <UserProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </UserProvider>
    </main>
  
  );
}

export default MyApp;




