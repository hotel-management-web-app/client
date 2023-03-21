import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  addRoomType,
  deleteRoomType,
  getRoomType,
  getRoomTypes,
  updateRoomType,
} from '../api/roomTypes';
import { RoomType, RoomTypeQuery } from '../types';

const backUrl = '/admin/hotel-configuration/room-types';

export const useGetRoomTypes = (page?: number, limit?: number) =>
  useQuery<RoomTypeQuery, AxiosError>(['roomTypes'], () =>
    getRoomTypes(page, limit)
  );

export const useGetRoomType = (id: number) =>
  useQuery<RoomType, AxiosError>(['roomTypes'], () => getRoomType(id));

export const useAddRoomType = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, FormData>(
    async (roomType) => addRoomType(roomType),
    {
      onSuccess: () => {
        router.push(backUrl);
        toast.success('Room Type added successfully!');
      },
    }
  );
};

export const useUpdateRoomType = (id: number) => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, FormData>(
    async (roomType) => updateRoomType(id, roomType),
    {
      onSuccess: () => {
        router.push(backUrl);
        toast.success('Room Type updated successfully!');
      },
    }
  );
};

export const useDeleteRoomType = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, number>(deleteRoomType, {
    onSuccess: () => {
      queryClient.invalidateQueries(['roomTypes']);
      toast.success('Room Type deleted successfully!');
    },
  });
};
