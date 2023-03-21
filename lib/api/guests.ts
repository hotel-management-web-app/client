import axios from 'axios';
import { Guest } from '../types';

const baseUrl = '/guests';

export const getGuests = async (page?: number, limit?: number) =>
  axios.get(`${baseUrl}?limit=${limit}&page=${page}`).then((res) => res.data);

export const getGuest = async (id: number) =>
  axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const addGuest = async (guest: Guest) => axios.post(baseUrl, guest);

export const updateGuest = async (id: number, guest: Guest) =>
  axios.put(`${baseUrl}/${id}`, guest);

export const deleteGuest = async (id: number) =>
  axios.delete(`${baseUrl}/${id}`);
