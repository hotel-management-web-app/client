import axios from 'axios';
import { RoomType } from '../types';

const baseUrl = '/room-types';

export const getRoomTypes = async () =>
  axios.get(baseUrl).then((res) => res.data);

export const getRoomType = async (id: number) =>
  axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const addRoomType = async (roomType: RoomType) =>
  axios.post(baseUrl, roomType);

export const updateRoomType = async (id: number, roomType: RoomType) =>
  axios.put(`${baseUrl}/${id}`, roomType);

export const deleteRoomType = async (id: number) =>
  axios.delete(`${baseUrl}/${id}`);
