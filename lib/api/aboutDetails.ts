import axios from 'axios';

const baseUrl = '/about-details';

export const getAboutDetails = async () =>
  axios.get(baseUrl).then((res) => res.data);

export const addAboutDetail = async (formData: FormData) =>
  axios.post(baseUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateAboutDetail = async (id: number, formData: FormData) =>
  axios.put(`${baseUrl}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteAboutDetail = async (id: number) =>
  axios.delete(`${baseUrl}/${id}`);
