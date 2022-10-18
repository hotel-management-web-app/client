import axios from 'axios';
import { Room } from '../types';

const baseUrl = '/rooms';

export const getRooms = async () => axios.get(baseUrl).then((res) => res.data);

export const getRoom = async (id: number) =>
  axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const addRoom = async (room: Room) => axios.post(baseUrl, room);

export const updateRoom = async (id: number, room: Room) =>
  axios.put(`${baseUrl}/${id}`, room);

export const deleteRoom = async (id: number) =>
  axios.delete(`${baseUrl}/${id}`);
