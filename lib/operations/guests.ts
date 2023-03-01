import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addGuest, deleteGuest, getGuests, updateGuest } from '../api/guests';
import { Guest } from '../types';

const backUrl = '/admin/guests';

export const useGetGuests = () =>
  useQuery<Guest[], AxiosError>(['guests'], getGuests);

export const useAddGuest = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Guest>(
    async (guest) => addGuest(guest),
    {
      onSuccess: () => {
        router.push(backUrl);
        toast.success('Guest added successfully!');
      },
    }
  );
};

export const useUpdateGuest = (id: number) => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Guest>(
    async (guest) => updateGuest(id, guest),
    {
      onSuccess: () => {
        router.push(backUrl);
        toast.success('Guest updated successfully!');
      },
    }
  );
};

export const useDeleteGuest = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, number>(deleteGuest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['guests']);
      toast.success('Guest deleted successfully!');
    },
  });
};
