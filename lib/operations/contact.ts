import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { sendMail } from '../api/contact';
import { ContactFormInputs } from '../types';

export const useSendMail = () =>
  useMutation<AxiosResponse, AxiosError, ContactFormInputs>(sendMail);
