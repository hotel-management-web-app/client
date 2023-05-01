import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';
import HousekeepingStatusOptions from '../../../../components/Admin/Housekeeping/HousekeepingStatus';

const queryClient = new QueryClient();

describe('HousekeepingStatusOptions', () => {
  it('Should render properly', () => {
    const status = 'Confirmed';
    render(
      <QueryClientProvider client={queryClient}>
        <HousekeepingStatusOptions id={1} status={status} />
      </QueryClientProvider>
    );

    const statusText = screen.getByTestId('housekeeping-status');

    expect(statusText).toBeInTheDocument();
  });
});
