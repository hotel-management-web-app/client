import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { login } from '../api/auth';
import { LoginForm } from '../types';

export const useLogin = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, LoginForm>(
    async (data) => login(data),
    {
      onSuccess: () => router.push('/admin/dashboard'),
    }
  );
};
