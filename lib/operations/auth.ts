import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { getUsers, login, logout, register } from '../api/auth';
import { LoginForm, User, UserQuery } from '../types';

export const useRegister = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, User>(
    async (data) => register(data),
    {
      onSuccess: () => router.push('/admin/users'),
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

export const useGetUsers = (page?: number, limit?: number, search?: string) =>
  useQuery<UserQuery, AxiosError>(['users'], () =>
    getUsers(page, limit, search)
  );
