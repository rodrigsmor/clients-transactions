import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import AppContext from '../utils/context/appContext';
import { useState } from 'react';
import { User } from 'src/utils/@types/user';

export default function App({ Component, pageProps }: AppProps) {
  const [ user, setUser ] = useState<User>({
    name: '',
    email: '',
    profile_picture: '',
  });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Toaster position='top-center' />
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
