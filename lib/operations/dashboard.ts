import { useQuery } from 'react-query';
import { getDashboardData } from '../api/dashboard';

export const useGetDashboardData = () =>
  useQuery(['dashboard'], getDashboardData);
