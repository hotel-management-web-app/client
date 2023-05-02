import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import Dashboard from '../../../../components/Admin/Dashboard';

describe('Dashboard', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Dashboard dashboardData={dashboardData} />
      </MockWrapper>
    );

    const commentText = screen.getByTestId('dashboard');

    expect(commentText).toBeInTheDocument();
  });
});

const dashboardData = {
  personCount: { adults: 5, children: 0 },
  allRoomStatusCount: { availableRooms: 5, reservedRooms: 0 },
  allBookingStatusCount: {
    confirmed: 5,
    pending: 0,
    cancelled: 0,
    notConfirmed: 0,
  },
  allHousekeepingStatusCount: {
    clean: 5,
    cleaning: 0,
    dirty: 0,
    outOfService: 0,
  },
  arrivalsAndDeparturesToday: { arrivalsToday: [], departuresToday: [] },
  availableRoomsByRoomTypeCount: [
    { name: 'Single Room', count: 1 },
    { name: 'Double Room', count: 1 },
    { name: 'Deluxe Room', count: 1 },
    { name: 'Dreamer Room', count: 1 },
    { name: 'Premier Room', count: 1 },
  ],
  revenueData: [
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
  ],
};
