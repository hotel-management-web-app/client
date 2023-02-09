import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { getReport } from '../api/report';
import { Report } from '../types';

export const useGetReport = () =>
  useMutation<AxiosResponse, AxiosError, Report>(async (data) =>
    getReport(data)
  );
