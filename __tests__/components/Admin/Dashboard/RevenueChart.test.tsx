import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RevenueChart from '../../../../components/Admin/Dashboard/RevenueChart';

describe('Circle Chart', () => {
  it('Should render properly', () => {
    const title = 'Revenues';
    render(<RevenueChart revenueData={revenueData} />);

    const commentText = screen.getByText(title);

    expect(commentText).toBeInTheDocument();
  });
});

const revenueData = [
  { month: 'Jan', totalAmount: 0 },
  { month: 'Feb', totalAmount: 0 },
  { month: 'Mar', totalAmount: 21206.11 },
  { month: 'Apr', totalAmount: 0 },
  { month: 'May', totalAmount: 0 },
  { month: 'June', totalAmount: 0 },
  { month: 'July', totalAmount: 0 },
  { month: 'Aug', totalAmount: 0 },
  { month: 'Sept', totalAmount: 0 },
  { month: 'Oct', totalAmount: 0 },
  { month: 'Nov', totalAmount: 0 },
  { month: 'Dec', totalAmount: 0 },
];
