import { AxiosResponse, AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { getSettings, updateSettings } from '../api/generalSettings';
import { GeneralSettings } from '../types';

export const useGetSettings = () => useQuery(['settings'], getSettings);

export const useUpdateSettings = () =>
  useMutation<AxiosResponse, AxiosError, GeneralSettings>(async (settings) =>
    updateSettings(settings)
  );
