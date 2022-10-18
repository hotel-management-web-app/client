import axios from 'axios';

const baseUrl = '/housekeeping';

export const getRooms = async () => axios.get(baseUrl).then((res) => res.data);

export const updateHousekeepingStatus = async (
  id: number,
  status: { [status: string]: string }
) => axios.patch(`${baseUrl}/${id}`, status);
