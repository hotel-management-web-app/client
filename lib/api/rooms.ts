import axios from 'axios';
import { Room } from '../types';

export const getRooms = async () => axios.get('/room').then((res) => res.data);

export const getRoom = async (id: number) =>
  axios.get(`/room/${id}`).then((res) => res.data);

export const addRoom = async (roomType: Room) => axios.post('/room', roomType);

export const updateRoom = async (id: number, roomType: Room) =>
  axios.put(`/room/${id}`, roomType);

export const deleteRoom = async (id: number) => axios.delete(`/room/${id}`);
