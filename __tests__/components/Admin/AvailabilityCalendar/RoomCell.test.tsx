import React from 'react';
import { render, screen } from '@testing-library/react';
import { Room } from '../../../../lib/types';
import '@testing-library/jest-dom';
import RoomCell from '../../../../components/Admin/AvailabilityCalendar/RoomCell';

describe('Room Cell', () => {
  it('Should render properly', () => {
    render(<RoomCell dates={[]} bookings={[]} cellWidth={100} room={room} />);

    const buttonText = screen.getByText(room.roomNumber);

    expect(buttonText).toBeInTheDocument();
  });
});

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
