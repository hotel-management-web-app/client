import axios from 'axios';
import { Booking } from '../types';

const baseUrl = '/bookings';

export const getBookings = async (page: number = 1, limit: number = 5) =>
  axios.get(`${baseUrl}?limit=${limit}&page=${page}`).then((res) => res.data);

export const getBooking = async (id: number) =>
  axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const addBooking = async (booking: Booking) =>
  axios.post(baseUrl, booking);

export const updateBooking = async (id: number, booking: Booking) =>
  axios.put(`${baseUrl}/${id}`, booking);

export const deleteBooking = async (id: number) =>
  axios.delete(`${baseUrl}/${id}`);
