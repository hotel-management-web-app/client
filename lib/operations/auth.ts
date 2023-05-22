import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  deleteUser,
  getUser,
  getUsers,
  login,
  logout,
  register,
  updateUser,
} from '../api/auth';
import { LoginForm, User, UserQuery } from '../types';

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

export const useGetUsers = (page?: number, limit?: number, search?: string) =>
  useQuery<UserQuery, AxiosError>(['users'], () =>
    getUsers(page, limit, search)
  );

export const useGetUser = (id: number) =>
  useQuery<User, AxiosError>(['users'], () => getUser(id));

export const useUpdateUser = (id: number) => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, User>(
    async (user) => updateUser(id, user),
    {
      onSuccess: () => {
        router.push(backUrl);
        toast.success('User updated successfully!');
      },
    }
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, number>(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully!');
    },
  });
};
