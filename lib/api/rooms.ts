import axios from 'axios';
import { Room, StatusesProps } from '../types';

const baseUrl = '/rooms';

export const getRooms = async (
  page?: number,
  limit?: number,
  search: string = ''
) =>
  axios
    .get(`${baseUrl}?limit=${limit}&page=${page}&search=${search}`)
    .then((res) => res.data);

export const getRoom = async (id: number) =>
  axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const addRoom = async (room: Room) => axios.post(baseUrl, room);

export const updateRoom = async (id: number, room: Room) =>
  axios.put(`${baseUrl}/${id}`, room);

export const updateRoomField = async (id: number, payload: StatusesProps) =>
  axios.patch(`${baseUrl}/${id}`, payload);

export const deleteRoom = async (id: number) =>
  axios.delete(`${baseUrl}/${id}`);
