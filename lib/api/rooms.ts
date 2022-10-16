import axios from 'axios';
import { Room } from '../types';

export const getRooms = async () => axios.get('/rooms').then((res) => res.data);

export const getRoom = async (id: number) =>
  axios.get(`/rooms/${id}`).then((res) => res.data);

export const addRoom = async (room: Room) => axios.post('/rooms', room);

export const updateRoom = async (id: number, room: Room) =>
  axios.put(`/rooms/${id}`, room);

export const deleteRoom = async (id: number) => axios.delete(`/rooms/${id}`);
