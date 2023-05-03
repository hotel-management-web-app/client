import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import RoomBooking from '../../pages/room-booking';

describe('RoomBooking', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <RoomBooking />
      </MockWrapper>
    );

    const divElement = screen.getByTestId('room-booking');

    expect(divElement).toBeInTheDocument();
  });
});
