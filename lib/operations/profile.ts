import { AxiosResponse, AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { getProfileInfo, updateProfileInfo } from '../api/profile';
import { ProfileInfo } from '../types';

export const useGetProfileInfo = () =>
  useQuery<ProfileInfo, AxiosError>(['profile-info'], getProfileInfo);

export const useUpdateProfileInfo = () =>
  useMutation<AxiosResponse, AxiosError, ProfileInfo>(
    async (profileInfo) => updateProfileInfo(profileInfo),
    {
      onSuccess: () => {
        toast.success('Profile updated successfully!');
      },
    }
  );
