import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { createNewBooking, payForStay } from '../api/payment';
import { PaymentData } from '../types';

export const usePayForStay = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, PaymentData>(
    async (data) => payForStay(data),
    {
      onSuccess: (res) => router.push(res.data.url),
    }
  );
};

export const useCreateNewBooking = () =>
  useMutation<AxiosResponse, AxiosError, string>(async (sessionId) =>
    createNewBooking(sessionId)
  );
