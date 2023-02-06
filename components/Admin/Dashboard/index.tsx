import React from 'react';
import { DashboardData } from '../../../lib/types';
import ArrivalsAndDepartures from './ArrivalsAndDepartures';
import CircleChart from './CircleChart';

interface DashboardProps {
  dashboardData: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ dashboardData }) => {
  const {
    personCount,
    allRoomStatusCount,
    arrivalsAndDeparturesToday,
    allBookingStatusCount,
    allHousekeepingStatusCount,
  } = dashboardData || {};

  return (
    <div className="mt-10 flex flex-wrap gap-16">
      <CircleChart title="Bookings" data={allBookingStatusCount} horizontal />
      <ArrivalsAndDepartures data={arrivalsAndDeparturesToday} />
      <CircleChart title="Rooms" data={allRoomStatusCount} />
      <CircleChart
        title="Housekeeping"
        data={allHousekeepingStatusCount}
        horizontal
      />
      <CircleChart title="Guests" data={personCount} />
    </div>
  );
};

export default Dashboard;
