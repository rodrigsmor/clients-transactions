import Link from "next/link";
import { CtaButton } from "@components/buttons";
import { FormEvent, ReactNode } from "react";
import { useRouter } from "next/router";

interface AuthTemplateProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  ctaButtonLabel: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const AuthTemplate = ({ children, onSubmit, ctaButtonLabel, subtitle, title }: AuthTemplateProps) => {
  const router = useRouter();

  return (
    <main className="w-screen h-screen bg-background-main px-4 grid place-items-center">
      <form className='w-full flex items-center justify-center flex-col md:w-3/4 lg:w-[48%] gap-10 bg-background-dark p-5 rounded-3xl border-2 border-primary-main/10' onSubmit={onSubmit}>
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
      </form>
    </main>
  );
}