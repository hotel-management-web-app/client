import axios from 'axios';
import { RoomType } from '../types';

export const getRoomTypes = async () =>
  axios.get('/room-types').then((res) => res.data);

export const getRoomType = async (id: number) =>
  axios.get(`/room-types/${id}`).then((res) => res.data);

export const addRoomType = async (roomType: RoomType) =>
  axios.post('/room-types', roomType);

export const updateRoomType = async (id: number, roomType: RoomType) =>
  axios.put(`/room-types/${id}`, roomType);

export const deleteRoomType = async (id: number) =>
  axios.delete(`/room-types/${id}`);
