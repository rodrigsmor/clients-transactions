import { FormEvent } from "react";
import { InputForm } from "@components/forms/inputForm";
import { AuthTemplate } from "@components/layout/authTemplate";

export default function Home() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('cadastrou')
  }

  return (
    <AuthTemplate onSubmit={handleSubmit} title="Cadastrar" subtitle="Registra já e gerencia as transações de seus clientes." ctaButtonLabel="cadastrar">
      <>
        <InputForm label="Name" name="fullName" placeholder="Type your full name" type="text" className="col-start-1 col-end-2" />
        <InputForm label="E-mail" name="email" placeholder="Type your e-mail" type="email" className="col-start-2 col-end-3" />
        <InputForm label="password" name="password" placeholder="Type your password" type="password" className="col-start-1 col-end-3" />
        <InputForm label="Confirm password" name="confirmPassword" placeholder="Retype your password" type="password" className="col-start-1 col-end-3" />
      </>
    </AuthTemplate>
  )
}
