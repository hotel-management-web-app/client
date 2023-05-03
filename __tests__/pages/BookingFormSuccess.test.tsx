import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import BookingFormSuccess from '../../pages/booking-form/payment-success';

describe('BookingFormSuccess', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <BookingFormSuccess />
      </MockWrapper>
    );

    const headingElement = screen.getByText(
      /Transaction Completed Successfully/i
    );

    expect(headingElement).toBeInTheDocument();
  });
});
