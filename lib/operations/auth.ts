import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { login, logout, register } from '../api/auth';
import { LoginForm, User } from '../types';

const backUrl = '/admin/users';

export const useRegister = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, User>(
    async (data) => register(data),
    {
      onSuccess: () => {
        router.push(backUrl);
        toast.success('New user has been registered successfully!');
      },
    }
  );
};

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
