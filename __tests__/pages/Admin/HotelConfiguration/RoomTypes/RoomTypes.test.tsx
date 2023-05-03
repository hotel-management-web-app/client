import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../../__mocks__/MockWrapper';
import RoomTypes from '../../../../../pages/admin/hotel-configuration/room-types';

describe('RoomTypes', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <RoomTypes />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Room types/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
