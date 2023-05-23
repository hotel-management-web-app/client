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
  return useMutation<AxiosResponse & { role: string }, AxiosError, LoginForm>(
    async (data) => login(data),
    {
      onSuccess: (res) => {
        router.push('/admin/dashboard');
        localStorage.setItem('role', res.role);
      },
    }
  );
};

export const useLogout = () => {
  const router = useRouter();
  return useMutation(logout, {
    onSuccess: () => {
      router.push('/login');
      localStorage.removeItem('role');
    },
  });
};
