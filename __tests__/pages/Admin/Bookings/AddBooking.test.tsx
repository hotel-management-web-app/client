import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import AddBooking from '../../../../pages/admin/bookings/create';

describe('AddBooking', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AddBooking />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Add booking/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
