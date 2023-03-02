import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { sendMail } from '../api/contact';
import { ContactFormInputs } from '../types';

export const useSendMail = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, ContactFormInputs>(sendMail, {
    onSuccess: () => {
      router.push('/contact/success');
    },
  });
};
