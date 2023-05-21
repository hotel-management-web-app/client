import axios from 'axios';
import { LoginForm } from '../types';

const baseUrl = '/auth';

export const register = async (data: LoginForm) =>
  axios.post(`${baseUrl}/register`, data).then((res) => res.data);

export const login = async (data: LoginForm) =>
  axios
    .post(`${baseUrl}/login`, data, { withCredentials: true })
    .then((res) => res.data);

export const logout = async () =>
  axios.post(`${baseUrl}/logout`, null, { withCredentials: true }).then(() => {
    delete axios.defaults.headers.common.Authorization;
  });

export const getUsers = async (
  page?: number,
  limit?: number,
  search: string = ''
) =>
  axios
    .get(`${baseUrl}/users?limit=${limit}&page=${page}&search=${search}`)
    .then((res) => res.data);
