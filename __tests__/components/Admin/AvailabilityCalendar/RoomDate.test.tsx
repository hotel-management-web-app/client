import React from 'react';
import { render, screen } from '@testing-library/react';
import { Room } from '../../../../lib/types';
import '@testing-library/jest-dom';
import RoomDate from '../../../../components/Admin/AvailabilityCalendar/RoomDate';

describe('Room Date', () => {
  it('Should render properly', () => {
    // eslint-disable-next-line react/no-children-prop
    render(<RoomDate day={day} cellWidth={100} room={room} children={[]} />);

    const buttonText = screen.getByTestId('room-date');

    expect(buttonText).toBeInTheDocument();
  });
});

const day = new Date(
  'Sun May 14 2023 00:00:00 GMT+0200 (Central European Summer Time)'
);

// @ts-ignore
const room: Room = {
  id: 1,
  roomTypeId: 1,
  roomNumber: 87,
  floorNumber: 5,
  roomStatus: 'VACANT',
  housekeepingStatus: 'CLEAN',
  priority: 'HIGH',
  comments: '',
  bookings: [],
};
