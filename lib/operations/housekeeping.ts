import { AxiosResponse, AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { updateHousekeepingStatus } from '../api/housekeeping';
import { HousekeepingField } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const useUpdateHousekeepingField = (id: number) =>
  useMutation<AxiosResponse, AxiosError, HousekeepingField>(async (status) =>
    updateHousekeepingStatus(id, status)
  );
