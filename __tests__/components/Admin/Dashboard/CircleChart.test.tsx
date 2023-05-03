import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CircleChart from '../../../../components/Admin/Dashboard/CircleChart';

describe('Circle Chart', () => {
  it('Should render properly', () => {
    const title = 'Bookings';
    render(<CircleChart title={title} data={allBookingStatusCount} />);

    const commentText = screen.getByText(title);

    expect(commentText).toBeInTheDocument();
  });
});

const allBookingStatusCount = {
  confirmed: 5,
  pending: 0,
  cancelled: 0,
  notConfirmed: 0,
};
