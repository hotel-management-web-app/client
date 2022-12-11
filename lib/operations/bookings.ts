import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addBooking,
  updateBooking,
  deleteBooking,
  getBookings,
} from '../api/bookings';
import { Booking } from '../types';

const backUrl = 'http://localhost:3000/admin/bookings';

export const useGetBookings = () =>
  useQuery<Booking[], AxiosError>(['bookings'], getBookings);

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

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, number>(deleteBooking, {
    onSuccess: () => queryClient.invalidateQueries(['bookings']),
  });
};
