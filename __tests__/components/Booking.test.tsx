import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Booking from '../../components/Booking';

describe('Booking', () => {
  it('Should render properly', () => {
    render(<Booking />);

    const buttonElement = screen.getByText(/Check availability/i);

    expect(buttonElement).toBeInTheDocument();
  });
});
