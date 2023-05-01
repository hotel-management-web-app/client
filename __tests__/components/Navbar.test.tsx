import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../../components/Navbar';

const queryClient = new QueryClient();

describe('Navbar', () => {
  it('Should render properly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Navbar />
      </QueryClientProvider>
    );

    const buttonElement = screen.getByText(/Book Now/i);

    expect(buttonElement).toBeInTheDocument();
  });
});
