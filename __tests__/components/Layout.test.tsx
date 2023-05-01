import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../../components/Layout';

const queryClient = new QueryClient();

describe('Layout', () => {
  it('Should render properly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Layout>
          <div>
            <p>Children</p>
          </div>
        </Layout>
      </QueryClientProvider>
    );

    const pElement = screen.getByText(/Children/i);

    expect(pElement).toBeInTheDocument();
  });
});
