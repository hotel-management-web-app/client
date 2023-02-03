import axios from 'axios';
import { ProfileInfo } from '../types';

const baseUrl = '/profile-info';

export const getProfileInfo = async () =>
  axios.get(baseUrl).then((res) => res.data);

export const updateProfileInfo = async (profileInfo: ProfileInfo) =>
  axios.put(baseUrl, profileInfo);
