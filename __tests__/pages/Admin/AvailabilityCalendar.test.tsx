import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../__mocks__/MockWrapper';
import AvailabilityCalendar from '../../../pages/admin/availability-calendar';

describe('AvailabilityCalendar', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AvailabilityCalendar />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Availability calendar/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
