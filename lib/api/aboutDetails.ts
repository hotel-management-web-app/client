import axios from 'axios';
import { AboutDetail } from '../types';

const baseUrl = '/about-details';

export const getAboutDetails = async () =>
  axios.get(baseUrl).then((res) => res.data);

export const addAboutDetail = async (detail: AboutDetail) =>
  axios.post(baseUrl, detail);

export const updateAboutDetail = async (id: number, detail: AboutDetail) =>
  axios.put(`${baseUrl}/${id}`, detail);

export const deleteAboutDetail = async (id: number) =>
  axios.delete(`${baseUrl}/${id}`);
