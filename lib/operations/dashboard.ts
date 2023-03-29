import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getDashboardData } from '../api/dashboard';
import { DashboardData } from '../types';

export const useGetDashboardData = () =>
  useQuery<DashboardData, AxiosError>(['dashboard'], getDashboardData);
