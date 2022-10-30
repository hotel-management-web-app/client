import { AxiosResponse, AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getRooms, updateHousekeepingStatus } from '../api/housekeeping';
import { Housekeeping, HousekeepingField } from '../types';

export const useGetRooms = () =>
  useQuery<Housekeeping[], AxiosError>(['housekeeping'], getRooms);

export const useUpdateHousekeepingField = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, HousekeepingField>(
    async (status) => updateHousekeepingStatus(id, status),
    {
      onSuccess: () => queryClient.invalidateQueries(['housekeeping']),
    }
  );
};
