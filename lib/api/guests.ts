import axios from 'axios';
import { Guest } from '../types';

const baseUrl = '/guests';

export const getGuests = async () => axios.get(baseUrl).then((res) => res.data);

export const getGuest = async (id: number) =>
  axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const addGuest = async (geust: Guest) => axios.post(baseUrl, geust);

export const updateGuest = async (id: number, geust: Guest) =>
  axios.patch(`${baseUrl}/${id}`, geust);

export const deleteGuest = async (id: number) =>
  axios.delete(`${baseUrl}/${id}`);
