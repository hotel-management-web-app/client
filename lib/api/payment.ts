import axios from 'axios';
import { PaymentData } from '../types';

const baseUrl = '/checkout';

export const payForStay = async (data: PaymentData) =>
  axios.post(baseUrl, data);

export const createNewBooking = async (sessionId: string) =>
  axios.post(`${baseUrl}/booking`, { sessionId });
