import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { getReport } from '../api/report';
import { ReportForm } from '../types';

export const useGetReport = () =>
  useMutation<AxiosResponse, AxiosError, ReportForm>(async (data) =>
    getReport(data)
  );
