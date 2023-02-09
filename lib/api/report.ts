import axios from 'axios';
import { Report } from '../types';

export const getReport = async (data: Report) => axios.post('/report', data);
