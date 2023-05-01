import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';
import PriorityStatusOptions from '../../../../components/Admin/Housekeeping/PriorityStatus';

const queryClient = new QueryClient();

describe('PriorityStatusOptions', () => {
  it('Should render properly', () => {
    const status = 'High';
    render(
      <QueryClientProvider client={queryClient}>
        <PriorityStatusOptions id={1} status={status} />
      </QueryClientProvider>
    );

    const statusText = screen.getByTestId('priority-status');

    expect(statusText).toBeInTheDocument();
  });
});
