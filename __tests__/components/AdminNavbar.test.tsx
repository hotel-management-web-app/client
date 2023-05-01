import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminNavbar from '../../components/AdminNavbar';

const queryClient = new QueryClient();

describe('AdminNavbar', () => {
  it('Should render properly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AdminNavbar />
      </QueryClientProvider>
    );

    const aElement = screen.getByText(/Profile/i);

    expect(aElement).toBeInTheDocument();
  });
});
