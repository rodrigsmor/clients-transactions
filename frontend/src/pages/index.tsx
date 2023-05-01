import * as Yup from 'yup';
import { FormEvent } from "react";
import apiClient from 'src/utils/config/api.client';
import { InputForm } from "@components/forms/inputForm";
import { AuthTemplate } from "@components/layout/authTemplate";
import SignupType from 'src/utils/@types/signup';
import SigninType from 'src/utils/@types/login';
import { useRouter } from 'next/router';

const validationSchema = Yup.object({
  fullName: Yup.string().required('O nome é brigatório!'),
  email: Yup.string().email('E-mail inválido.').required('O e-mail é obrigatório!'),
  password: Yup.string().required('Senha é obrigatória!'),
  confirmPassword: Yup.string().required('Confirmar senha é obrigatório!').oneOf([Yup.ref('password'), ''], 'As senhas precisam ser iguais!')
})

export default function Signup() {
  const router = useRouter();

  const handleSubmit = async (event: SignupType | SigninType) => {
    const data = event as SignupType;

    await apiClient.post('/auth/signup', {
      name: data.fullName,
      password: data.password,
      email: data.email,
    })
      .then(({ data }) => {
        if(data.accessToken && data.refreshToken) {
          localStorage.setItem('token', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)

          router.push('/app/home');
        }
      })
      .catch(error => {
        alert(error)
      })
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
        <InputForm label="Nome completo" name="fullName" placeholder="Type your full name" type="text" className="col-start-1 col-end-2" props={{ autoComplete: 'off' }} />
        <InputForm label="E-mail" name="email" placeholder="Type your e-mail" type="email" className="col-start-2 col-end-3" />
        <InputForm label="Senha" name="password" placeholder="Type your password" type="password" className="col-start-1 col-end-3" />
        <InputForm label="Confirmar senha" name="confirmPassword" placeholder="Retype your password" type="password" className="col-start-1 col-end-3" />
      </>
    </AuthTemplate>
  )
}
