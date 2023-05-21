import axios from 'axios';
import { Booking } from '../types';

const baseUrl = '/bookings';

export const getBookings = async (
  page?: number,
  limit?: number,
  search: string = ''
) =>
  axios
    .get(`${baseUrl}?limit=${limit}&page=${page}&search=${search}`)
    .then((res) => res.data);

export const getBooking = async (id: string) =>
  axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const addBooking = async (booking: Booking) =>
  axios.post(baseUrl, booking);

export const updateBooking = async (id: string, booking: Booking) =>
  axios.put(`${baseUrl}/${id}`, booking);

export const deleteBooking = async (id: string) =>
  axios.delete(`${baseUrl}/${id}`);
