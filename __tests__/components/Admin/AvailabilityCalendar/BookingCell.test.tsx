import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Booking } from '../../../../lib/types';
import BookingCell from '../../../../components/Admin/AvailabilityCalendar/BookingCell';

describe('Booking Cell', () => {
  it('Should render properly', () => {
    render(<BookingCell booking={booking} cellWidth={0} />);

    const { firstName, lastName } = booking.guest;
    const buttonText = screen.getByText(`${firstName} ${lastName}`);

    expect(buttonText).toBeInTheDocument();
  });
});

// @ts-ignore
const booking: Booking = {
  id: 1,
  status: 'CONFIRMED',
  arrivalDate: new Date('2023-03-24T16:06:16.978Z'),
  departureDate: new Date('2023-03-26T22:18:14.958Z'),
  roomId: 1,
  adults: 1,
  children: 0,
  totalPrice: 309869,
  guestId: 1,
  // @ts-ignore
  room: { roomNumber: 87 },
  // @ts-ignore
  guest: { firstName: 'Bethany', lastName: 'Powlowski' },
};
