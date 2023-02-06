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
    <div className="mt-10 flex items-start flex-wrap gap-10">
      <CircleChart title="Guests" data={personCount} />
      <CircleChart title="Rooms" data={allRoomStatusCount} />
      <ArrivalsAndDepartures data={arrivalsAndDeparturesToday} />
      <CircleChart title="Bookings" data={allBookingStatusCount} horizontal />
      <CircleChart
        title="Housekeeping"
        data={allHousekeepingStatusCount}
        horizontal
      />
    </div>
  );
};

export default Dashboard;
