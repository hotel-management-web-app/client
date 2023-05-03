import React from 'react';
import { render, screen } from '@testing-library/react';
import MockWrapper from '../../__mocks__/MockWrapper';
import '@testing-library/jest-dom';
import BookingFormInput from '../../components/BookingFormInput';

describe('BookingFormInput', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <BookingFormInput
          id="booking-input"
          title="Booking Input"
          fieldName="booking-input"
        />
      </MockWrapper>
    );

    const buttonElement = screen.getByText(/Booking Input/i);

    expect(buttonElement).toBeInTheDocument();
  });
});
