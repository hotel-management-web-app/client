import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { addRoom, deleteRoom, updateRoom } from '../api/rooms';
import { Room } from '../types';

const backUrl = 'http://localhost:3000/admin/hotel-configuration/rooms';

export const useAddRoom = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Room>(
    async (room) => addRoom(room),
    {
      onSuccess: () => router.push(backUrl),
    }
  );
};

export const useUpdateRoom = (id: number) => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError, Room>(
    async (room) => updateRoom(id, room),
    {
      onSuccess: () => router.push(backUrl),
    }
  );
};

export const useDeleteRoom = () =>
  useMutation<AxiosResponse, AxiosError, number>(deleteRoom);
