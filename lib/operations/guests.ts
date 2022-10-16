import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { addGuest, deleteGuest, updateGuest } from '../api/guests';
import { Guest } from '../types';

const backUrl = 'http://localhost:3000/admin/guests';

export const useAddGuest = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Guest>(
    async (guest) => addGuest(guest),
    {
      onSuccess: () => router.push(backUrl),
    }
  );
};

export const useUpdateGuest = (id: number) => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Guest>(
    async (guest) => updateGuest(id, guest),
    {
      onSuccess: () => router.push(backUrl),
    }
  );
};

export const useDeleteGuest = () =>
  useMutation<AxiosResponse, AxiosError, number>(deleteGuest);
