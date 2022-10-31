import { AxiosResponse, AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { updateProfileInfo } from '../api/profile';
import { ProfileInfo } from '../types';

export const useUpdateProfileInfo = () =>
  useMutation<AxiosResponse, AxiosError, ProfileInfo>(async (profileInfo) =>
    updateProfileInfo(profileInfo)
  );
