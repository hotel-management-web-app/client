import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { login, logout } from '../api/auth';
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

export const useLogout = () => {
  const router = useRouter();
  return useMutation(logout, {
    onSuccess: () => router.push('/login'),
  });
};
