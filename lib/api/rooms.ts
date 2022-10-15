import axios from 'axios';
import { Room } from '../types';

export const getRooms = async () => axios.get('/rooms').then((res) => res.data);

export const getRoom = async (id: number) =>
  axios.get(`/rooms/${id}`).then((res) => res.data);

export const addRoom = async (roomType: Room) => axios.post('/rooms', roomType);

export const updateRoom = async (id: number, roomType: Room) =>
  axios.put(`/rooms/${id}`, roomType);

export const deleteRoom = async (id: number) => axios.delete(`/rooms/${id}`);
