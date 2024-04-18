import Context from '@/app/context/UserContext'
import './global.css'
import UserProvider from '@/app/context/UserContext'

export default function MyApp({ Component, pageProps }) {
  return( 
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}