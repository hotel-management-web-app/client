import { StatusesProps } from '../lib/types';

export const roomStatuses: StatusesProps = {
  VACANT: 'Vacant',
  RESERVED: 'Reserved',
};

export const housekeepingStatuses: StatusesProps = {
  CLEAN: 'Clean',
  CLEANING: 'Cleaning',
  DIRTY: 'Dirty',
  OUT_OF_SERVICE: 'Out of service',
};

export const priorityStatuses: StatusesProps = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};
