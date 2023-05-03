import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import Bookings from '../../../../pages/admin/bookings';

describe('Bookings', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Bookings />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Bookings/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
