import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('Should render properly', () => {
    render(<Footer />);

    const pElement = screen.getByText(/©2022 all rights reserved/i);

    expect(pElement).toBeInTheDocument();
  });
});
