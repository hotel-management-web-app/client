import { AxiosResponse, AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { getProfileInfo, updateProfileInfo } from '../api/profile';
import { ProfileInfo } from '../types';

export const useGetProfileInfo = () =>
  useQuery<ProfileInfo, AxiosError>(['profile-info'], getProfileInfo);

export const useUpdateProfileInfo = () =>
  useMutation<AxiosResponse, AxiosError, ProfileInfo>(async (profileInfo) =>
    updateProfileInfo(profileInfo)
  );
