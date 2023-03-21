import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  addBooking,
  updateBooking,
  deleteBooking,
  getBookings,
  getBooking,
} from '../api/bookings';
import { Booking, BookingQuery } from '../types';

const backUrl = '/admin/bookings';

export const useGetBookings = (page?: number, limit?: number) =>
  useQuery<BookingQuery, AxiosError>(['bookings'], () =>
    getBookings(page, limit)
  );

export const useGetBooking = (id: number) =>
  useQuery<Booking, AxiosError>(['bookings'], () => getBooking(id));

export const useAddBooking = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Booking>(
    async (booking) => addBooking(booking),
    {
      onSuccess: () => {
        router.push(backUrl);
        toast.success('Booking added successfully!');
      },
    }
  );
};

export const useUpdateBooking = (id: number) => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Booking>(
    async (booking) => updateBooking(id, booking),
    {
      onSuccess: () => {
        router.push(backUrl);
        toast.success('Booking updated successfully!');
      },
    }
  );
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, number>(deleteBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
      toast.success('Booking deleted successfully!');
    },
  });
};
