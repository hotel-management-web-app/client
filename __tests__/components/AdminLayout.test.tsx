import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';
import AdminLayout from '../../components/AdminLayout';

const queryClient = new QueryClient();

describe('AdminLayout', () => {
  it('Should render properly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AdminLayout>
          <div>
            <p>Admin children</p>
          </div>
        </AdminLayout>
      </QueryClientProvider>
    );

    const pElement = screen.getByText(/Admin children/i);

    expect(pElement).toBeInTheDocument();
  });
});
