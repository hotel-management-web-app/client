import axios from 'axios';
import { Guest } from '../types';

export const getGuests = async () =>
  axios.get('/guests').then((res) => res.data);

export const getGuest = async (id: number) =>
  axios.get(`/guests/${id}`).then((res) => res.data);

export const addGuest = async (geust: Guest) => axios.post('/guests', geust);

export const updateGuest = async (id: number, geust: Guest) =>
  axios.patch(`/guests/${id}`, geust);

export const deleteGuest = async (id: number) => axios.delete(`/guests/${id}`);
