import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import BookingForm from '../../pages/booking-form';

describe('BookingForm', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <BookingForm />
      </MockWrapper>
    );

    const headingElement = screen.getByText(/Guest Information/i);

    expect(headingElement).toBeInTheDocument();
  });
});
