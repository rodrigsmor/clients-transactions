import { GoogleFonts } from 'next-google-fonts';
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <GoogleFonts href='https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
