import axios from 'axios';
import { AboutInfo } from '../types';

const baseUrl = '/about-info';

export const getAboutInfo = async () =>
  axios.get(baseUrl).then((res) => res.data);

export const updateAboutInfo = async (aboutInfo: AboutInfo) =>
  axios.post(baseUrl, aboutInfo);
