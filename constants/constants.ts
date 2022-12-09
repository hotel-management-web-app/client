import { BookingStatusedProps, StatusesProps } from '../lib/types';

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

export const guestStatuses: StatusesProps = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
};

export const bookingStatuses: BookingStatusedProps = {
  CONFIRMED: {
    convertedName: 'Confirmed',
    color: '#22C55E',
  },
  PENDING: {
    convertedName: 'Pending',
    color: '#FB923C',
  },
  NOT_CONFIRMED: {
    convertedName: 'Not confirmed',
    color: '#9CA3AF',
  },
  CANCELLED: {
    convertedName: 'Cancelled',
    color: '#EF4444',
  },
};
