import { AxiosResponse, AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { getSettings, updateSettings } from '../api/generalSettings';

export const useGetSettings = () => useQuery(['settings'], getSettings);

export const useUpdateSettings = () =>
  useMutation<AxiosResponse, AxiosError, FormData>(async (settings) =>
    updateSettings(settings)
  );
