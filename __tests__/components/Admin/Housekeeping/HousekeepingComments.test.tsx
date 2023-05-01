import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';
import HousekeepingComments from '../../../../components/Admin/Housekeeping/HousekeepingComments';

const queryClient = new QueryClient();

describe('HousekeepingComments', () => {
  it('Should render properly', () => {
    const comment = 'Comment';
    render(
      <QueryClientProvider client={queryClient}>
        <HousekeepingComments id={1} value={comment} />
      </QueryClientProvider>
    );

    const commentText = screen.getByText(comment);

    expect(commentText).toBeInTheDocument();
  });
});
