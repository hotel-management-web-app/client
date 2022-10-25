import { AxiosResponse, AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { updateAboutInfo } from '../api/about';
import {
  addAboutDetail,
  deleteAboutDetail,
  updateAboutDetail,
} from '../api/aboutDetails';
import { AboutDetail, AboutInfo } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const useAddAboutDetail = () =>
  useMutation<AxiosResponse, AxiosError, AboutDetail>(async (detail) =>
    addAboutDetail(detail)
  );

export const useUpdateAboutDetail = (id: number) =>
  useMutation<AxiosResponse, AxiosError, AboutDetail>(async (guest) =>
    updateAboutDetail(id, guest)
  );

export const useDeleteAboutDetail = () =>
  useMutation<AxiosResponse, AxiosError, number>(deleteAboutDetail);

export const useUpdateAboutInfo = () =>
  useMutation<AxiosResponse, AxiosError, AboutInfo>(async (aboutInfo) =>
    updateAboutInfo(aboutInfo)
  );
