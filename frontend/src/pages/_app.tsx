import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster, toast } from 'react-hot-toast'
import AppContext from '../utils/context/appContext';
import { useEffect, useState } from 'react';
import { User } from 'src/utils/@types/user';
import { useRouter } from 'next/router';
import apiClient from 'src/utils/config/api.client';
import * as jose from 'jose';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [ user, setUser ] = useState<User>({
    name: '',
    email: '',
    profile_picture: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken')

    if(router.pathname === '/app/customers/new') return ;

    if(['/', '/login'].includes(router.pathname)) {
      if(token) {
        const decodedToken: any = jose.decodeJwt(token)

        if (Date.now() < decodedToken.exp * 1000) {
          router.push('/app/home');
        }
      }
    } else {
      if(!token && !refreshToken) router.push('/login')

      apiClient.get('/auth')
        .then(({ data }) => {
          console.log(data)
          setUser(data)
        }).catch(({ response: { data } }) => {
          toast.error(data.error.message);
        })
    }
  }, [router])

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Toaster position='top-center' />
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
