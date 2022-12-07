import { roomStatuses } from '../constants/constants';

export const convertRoomStatus = (roomStatus: string): string | undefined =>
  Object.keys(roomStatuses).find((key) => roomStatuses[key] === roomStatus);
