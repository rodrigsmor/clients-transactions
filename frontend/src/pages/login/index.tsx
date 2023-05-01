import * as Yup from 'yup';
import SigninType from 'src/utils/@types/login';
import SignupType from 'src/utils/@types/signup';
import { InputForm } from "@components/forms/inputForm";
import { AuthTemplate } from "@components/layout/authTemplate";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const validationSchema = Yup.object({
  email: Yup.string().email('E-mail inválido.').required('O e-mail é obrigatório!'),
  password: Yup.string().required('Senha é obrigatória!'),
})

const Login = () => {
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const handleSubmit = async (event: SignupType | SigninType) => {
    const data = event as SigninType;
    setIsLoading(true)

    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`, data)
      .then(({ data }) => {
        console.log(data.access_token)
        if(data.access_token && data.refresh_token) {
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('refreshToken', data.refresh_token)
          console.log(data.access_token)

          router.push('/app/home');
        }
      }).catch(({ response: { data } }) => {
        toast.error(data.error.message);
      }).finally(() => setIsLoading(false))
  }

  const initialValues = {
    email: '',
    password: '',
  }

  return (
    <AuthTemplate isLoading={isLoading} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} title="Conectar" ctaButtonLabel="conectar" subtitle="Conecte-se ao seu administrador e tenha acesso as transações de seus clientes.">
      <>
        <InputForm label="E-mail" name="email" placeholder="Type your e-mail" type="email" className="col-start-1 col-end-3" />
        <InputForm label="password" name="password" placeholder="Type your password" type="password" className="col-start-1 col-end-3" />
      </>
    </AuthTemplate>
  );
}

export default Login;