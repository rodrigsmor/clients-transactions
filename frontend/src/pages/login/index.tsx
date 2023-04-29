import { InputForm } from "@components/forms/inputForm";
import { AuthTemplate } from "@components/layout/authTemplate";
import { FormEvent } from "react";

const Login = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('logou')
  }

  return (
    <AuthTemplate onSubmit={handleSubmit} title="Conectar" ctaButtonLabel="conectar" subtitle="Conecte-se ao seu administrador e tenha acesso as transações de seus clientes.">
      <>
        <InputForm label="E-mail" name="email" placeholder="Type your e-mail" type="email" className="col-start-1 col-end-3" />
        <InputForm label="password" name="password" placeholder="Type your password" type="password" className="col-start-1 col-end-3" />
      </>
    </AuthTemplate>
  );
}

export default Login;