import axios from "axios";
import * as jose from 'jose';

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
})

apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');

  if(token) {
    try {
      const decodedToken: any = jose.decodeJwt(token)

      if(decodedToken.exp * 100 < Date.now()) {
        const refreshToken = localStorage.getItem('refreshToken');

        if(refreshToken) {
          try {
            const response = (await axios.post('/auth/refresh', {
              headers: {
                Authorization: `Bearer ${refreshToken}`
              },
            }));

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refreshToken', response.data.refreshToken)

            config.headers.Authorization = `Bearer ${response.data.token}`
          } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.replace('/login')
          }
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.log(error)

      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      window.location.replace('/login')
    }
  }

  return config;
})

export default apiClient;