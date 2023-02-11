import axios from 'axios';
import { ReportForm } from '../types';

export const getReport = async (data: ReportForm) =>
  axios.post('/report', data);
