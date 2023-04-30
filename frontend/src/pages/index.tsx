import * as Yup from 'yup';
import { FormEvent } from "react";
import { InputForm } from "@components/forms/inputForm";
import { AuthTemplate } from "@components/layout/authTemplate";

const validationSchema = Yup.object({
  fullName: Yup.string().required('O nome é brigatório!'),
  email: Yup.string().email('E-mail inválido.').required('O e-mail é obrigatório!'),
  password: Yup.string().required('Senha é obrigatória!'),
  confirmPassword: Yup.string().required('Confirmar senha é obrigatório!').oneOf([Yup.ref('password'), ''], 'As senhas precisam ser iguais!')
})

export default function Signup() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
  }

  const initialValues = {
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  }

  return (
    <AuthTemplate validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit} title="Cadastrar" subtitle="Registra já e gerencia as transações de seus clientes." ctaButtonLabel="cadastrar">
      <>
        <InputForm label="Nome completo" name="fullName" placeholder="Type your full name" type="text" className="col-start-1 col-end-2" />
        <InputForm label="E-mail" name="email" placeholder="Type your e-mail" type="email" className="col-start-2 col-end-3" />
        <InputForm label="Senha" name="password" placeholder="Type your password" type="password" className="col-start-1 col-end-3" />
        <InputForm label="Confirmar senha" name="confirmPassword" placeholder="Retype your password" type="password" className="col-start-1 col-end-3" />
      </>
    </AuthTemplate>
  )
}
