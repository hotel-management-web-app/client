import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteUser, getUser, getUsers, updateUser } from '../api/user';
import { User, UserQuery } from '../types';

const backUrl = '/admin/users';

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
