import axios from 'axios';
import { Booking } from '../types';

const baseUrl = '/bookings';

export const getBookings = async () =>
  axios.get(baseUrl).then((res) => res.data);

export const getBooking = async (id: number) =>
  axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const addBooking = async (geust: Booking) => axios.post(baseUrl, geust);

export const updateBooking = async (id: number, geust: Booking) =>
  axios.patch(`${baseUrl}/${id}`, geust);

export const deleteBooking = async (id: number) =>
  axios.delete(`${baseUrl}/${id}`);
