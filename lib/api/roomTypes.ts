import axios from 'axios';

const baseUrl = '/room-types';

export const getRoomTypes = (page?: number, limit?: number) =>
  axios.get(`${baseUrl}?limit=${limit}&page=${page}`).then((res) => res.data);

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
