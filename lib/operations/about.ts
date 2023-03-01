import { AxiosResponse, AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { getAboutInfo, updateAboutInfo } from '../api/about';
import {
  addAboutDetail,
  deleteAboutDetail,
  getAboutDetails,
  updateAboutDetail,
} from '../api/aboutDetails';
import { AboutDetail, AboutInfo } from '../types';

export const useGetAboutInfo = () =>
  useQuery<AboutInfo, AxiosError>(['aboutInfo'], getAboutInfo);

export const useUpdateAboutInfo = () =>
  useMutation<AxiosResponse, AxiosError, AboutInfo>(
    async (aboutInfo) => updateAboutInfo(aboutInfo),
    {
      onSuccess: () => {
        toast.success('About info updated successfully!');
      },
    }
  );

export const useGetAboutDetails = () =>
  useQuery<AboutDetail[], AxiosError>(['aboutDetails'], getAboutDetails);

export const useAddAboutDetail = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, FormData>(
    async (aboutDetail) => addAboutDetail(aboutDetail),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['aboutDetails']);
        toast.success('About detail added successfully!');
      },
    }
  );
};

export const useUpdateAboutDetail = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, FormData>(
    async (aboutDetail) => updateAboutDetail(id, aboutDetail),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['aboutDetails']);
        toast.success('About detail updated successfully!');
      },
    }
  );
};

export const useDeleteAboutDetail = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, number>(deleteAboutDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries(['aboutDetails']);
      toast.success('About detail deleted successfully!');
    },
  });
};
