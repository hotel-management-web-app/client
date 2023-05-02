import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Navbar />
      </MockWrapper>
    );

    const buttonElement = screen.getByText(/Book Now/i);

    expect(buttonElement).toBeInTheDocument();
  });
});
