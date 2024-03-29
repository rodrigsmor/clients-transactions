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

  const [ customersId, setCustomersId ] = useState<Set<number> | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken')

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
          setUser(data)
        }).catch(({ response: { data } }) => {
          toast.error(data.error.message);
        })
    }
  }, [router])

  return (
    <AppContext.Provider value={{ user, setUser, customersId, setCustomersId }}>
      <Toaster position='top-center' />
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
