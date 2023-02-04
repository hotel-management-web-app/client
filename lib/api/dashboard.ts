import axios from 'axios';

const baseUrl = '/dashboard';

export const getDashboardData = async () =>
  axios.get(baseUrl).then((res) => res.data);
