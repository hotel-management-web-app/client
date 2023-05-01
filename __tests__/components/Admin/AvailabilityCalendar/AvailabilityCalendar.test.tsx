import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';
import AvailabilityCalendar from '../../../../components/Admin/AvailabilityCalendar';

const queryClient = new QueryClient();

describe('Dashboard', () => {
  it('Should render properly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AvailabilityCalendar />
      </QueryClientProvider>
    );

    const buttonText = screen.getByRole('button', {
      name: /next month/i,
    });

    expect(buttonText).toBeInTheDocument();
  });
});
