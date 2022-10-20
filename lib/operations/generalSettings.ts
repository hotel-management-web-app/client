import { AxiosResponse, AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { updateSettings } from '../api/generalSettings';
import { GeneralSettings } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const useUpdateSettings = () =>
  useMutation<AxiosResponse, AxiosError, GeneralSettings>(async (settings) =>
    updateSettings(settings)
  );
