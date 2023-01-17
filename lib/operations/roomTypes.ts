import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addRoomType,
  deleteRoomType,
  getRoomTypes,
  updateRoomType,
} from '../api/roomTypes';
import { RoomType } from '../types';

const backUrl = 'http://localhost:3000/admin/hotel-configuration/room-types';

export const useGetRoomTypes = () =>
  useQuery<RoomType[], AxiosError>(['roomTypes'], getRoomTypes);

export const useAddRoomType = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, FormData>(
    async (roomType) => addRoomType(roomType),
    {
      onSuccess: () => router.push(backUrl),
    }
  );
};

export const useUpdateRoomType = (id: number) => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, FormData>(
    async (roomType) => updateRoomType(id, roomType),
    {
      onSuccess: () => router.push(backUrl),
    }
  );
};

export const useDeleteRoomType = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, number>(deleteRoomType, {
    onSuccess: () => queryClient.invalidateQueries(['roomTypes']),
  });
};
