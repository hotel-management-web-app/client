import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { addBooking, updateBooking, deleteBooking } from '../api/bookings';
import { Booking } from '../types';

const backUrl = 'http://localhost:3000/admin/bookings';

export const useAddBooking = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Booking>(
    async (booking) => addBooking(booking),
    {
      onSuccess: () => router.push(backUrl),
    }
  );
};

export const useUpdateBooking = (id: number) => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Booking>(
    async (booking) => updateBooking(id, booking),
    {
      onSuccess: () => router.push(backUrl),
    }
  );
};

export const useDeleteBooking = () =>
  useMutation<AxiosResponse, AxiosError, number>(deleteBooking);