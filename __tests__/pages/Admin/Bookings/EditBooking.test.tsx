import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import EditBooking from '../../../../pages/admin/bookings/edit/[id]';

describe('EditBooking', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <EditBooking />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Edit booking/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
