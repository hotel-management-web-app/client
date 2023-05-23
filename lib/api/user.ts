import axios from 'axios';
import { User } from '../types';

const baseUrl = '/users';

export const getUsers = async (
  page?: number,
  limit?: number,
  search: string = ''
) =>
  axios
    .get(`${baseUrl}?limit=${limit}&page=${page}&search=${search}`)
    .then((res) => res.data);

export const getUser = async (id: number) =>
  axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const updateUser = async (id: number, user: User) =>
  axios.put(`${baseUrl}/${id}`, user);

export const deleteUser = async (id: number) =>
  axios.delete(`${baseUrl}/${id}`);
