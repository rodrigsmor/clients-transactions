import dotenv from 'dotenv';
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  dotenv.config();

  return (
    <Html lang="pt-BR">
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
