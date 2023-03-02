import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  addRoom,
  deleteRoom,
  getRooms,
  updateRoom,
  updateRoomField,
} from '../api/rooms';
import { Room, StatusesProps } from '../types';

const backUrl = '/admin/hotel-configuration/rooms';

export const useGetRooms = () =>
  useQuery<Room[], AxiosError>(['rooms'], getRooms);

export const useAddRoom = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Room>(
    async (room) => addRoom(room),
    {
      onSuccess: () => {
        router.push(backUrl);
        toast.success('Room added successfully!');
      },
    }
  );
};

export const useUpdateRoom = (id: number) => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Room>(
    async (room) => updateRoom(id, room),
    {
      onSuccess: () => {
        router.push(backUrl);
        toast.success('Room updated successfully!');
      },
    }
  );
};

export const useUpdateRoomField = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, StatusesProps>(
    async (status) => updateRoomField(id, status),
    {
      onSuccess: () => queryClient.invalidateQueries(['rooms']),
    }
  );
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, number>(deleteRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
      toast.success('Room deleted successfully!');
    },
  });
};
