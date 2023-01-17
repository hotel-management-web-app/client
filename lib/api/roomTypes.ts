import axios from 'axios';
import { RoomType } from '../types';

const baseUrl = '/room-types';

export const getRoomTypes = (): Promise<RoomType[]> =>
  axios.get(baseUrl).then((res) => res.data);

export const getRoomType = async (id: number) =>
  axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const addRoomType = async (formData: FormData) =>
  axios.post(baseUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateRoomType = async (id: number, formData: FormData) =>
  axios.put(`${baseUrl}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteRoomType = async (id: number) =>
  axios.delete(`${baseUrl}/${id}`);
