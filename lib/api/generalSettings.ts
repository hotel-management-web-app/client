import axios from 'axios';
import { GeneralSettings } from '../types';

const baseUrl = '/general-settings';

export const getSettings = async (): Promise<GeneralSettings> =>
  axios.get(baseUrl).then((res) => res.data);

export const updateSettings = async (settings: GeneralSettings) =>
  axios.post(baseUrl, settings);
