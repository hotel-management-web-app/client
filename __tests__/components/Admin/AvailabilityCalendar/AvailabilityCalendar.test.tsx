import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import AvailabilityCalendar from '../../../../components/Admin/AvailabilityCalendar';

describe('Availability Calendar', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AvailabilityCalendar />
      </MockWrapper>
    );

    const buttonText = screen.getByRole('button', {
      name: /next month/i,
    });

    expect(buttonText).toBeInTheDocument();
  });
});
