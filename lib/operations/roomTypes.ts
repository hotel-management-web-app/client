import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { addRoomType, deleteRoomType, updateRoomType } from '../api/roomTypes';
import { RoomType } from '../types';

export const useAddRoomType = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, RoomType>(
    async (roomType) => addRoomType(roomType),
    {
      onSuccess: () =>
        router.push(
          'http://localhost:3000/admin/hotel-configuration/room-types'
        ),
    }
  );
};

export const useUpdateRoomType = (id: number) => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, RoomType>(
    async (roomType) => updateRoomType(id, roomType),
    {
      onSuccess: () =>
        router.push(
          'http://localhost:3000/admin/hotel-configuration/room-types'
        ),
    }
  );
};

export const useDeleteRoomType = () =>
  useMutation<AxiosResponse, AxiosError, number>(deleteRoomType);
