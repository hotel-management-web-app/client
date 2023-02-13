import axios from 'axios';
import { ContactFormInputs } from '../types';

const baseUrl = '/contact';

export const sendMail = async (data: ContactFormInputs) =>
  axios.post(baseUrl, data);
