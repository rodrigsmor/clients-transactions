import Link from "next/link";
import { CtaButton } from "@components/buttons/ctaButton";
import { FormEvent, ReactNode } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Form, Formik } from "formik";
import SignupType from "src/utils/@types/signup";
import SigninType from "src/utils/@types/login";

interface AuthTemplateProps {
  title: string;
  subtitle: string;
  initialValues: any;
  children: ReactNode;
  ctaButtonLabel: string;
  validationSchema: any;
  onSubmit: (event: SignupType | SigninType) => void;
}

export const AuthTemplate = ({ children, onSubmit, validationSchema, ctaButtonLabel, subtitle, title, initialValues }: AuthTemplateProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>App - { router.pathname.includes('login') ? 'Login' : 'Sign up' }</title>
      </Head>
      <main className="w-screen h-screen bg-background-main px-4 grid place-items-center">
        <Formik<SignupType | SigninType>
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form
            className='w-full flex items-center justify-center flex-col md:w-3/4 lg:w-[48%] gap-10 bg-background-dark p-5 rounded-3xl border-2 border-primary-main/10' 
          >
            <header className="w-full grid place-items-center gap-2">
              <h1 className="text-typography-main font-bold text-3xl lg:text-5xl text-center">{ title }</h1>
              <p className="w-full font-regular max-w-full text-typography-light/60 text-center leading-5 text-lg">{ subtitle }</p>
            </header>
            <fieldset className="w-full flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-x-4">
            { children }
            </fieldset>
            <footer className="w-full flex-col min-w-full gap-4 flex items-center justify-center h-fit">
              <CtaButton type="submit" label={ctaButtonLabel} className="!w-full lg:!w-3/5" />
              {
                router.pathname.includes('login')
                  ? (
                    <p className="font-medium text-typography-main/60 text-base">
                      Já possui conta? Então <Link className='font-semibold text-primary-main hover:text-primary-dark transition-all duration-300' href={'/'}>cadastre-se</Link>.
                    </p>
                  ) : (
                    <p className="font-medium text-typography-main/60 text-base">
                      Deseja <Link className='font-semibold text-primary-main hover:text-primary-dark transition-all duration-300' href={'/login'}>se conectar</Link>?
                    </p>
                  )
              }
            </footer>
          </Form>
        </Formik>
      </main>
    </>
  );
}