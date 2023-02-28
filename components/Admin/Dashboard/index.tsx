import React from 'react';
import { DashboardData } from '../../../lib/types';
import ArrivalsAndDepartures from './ArrivalsAndDepartures';
import CircleChart from './CircleChart';
import RevenueChart from './RevenueChart';
import RoomTypesChart from './RoomTypesChart';

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
    availableRoomsByRoomTypeCount,
    revenueData,
  } = dashboardData || {};

  return (
    <div className="mt-10 flex flex-wrap gap-16 pb-16 justify-center xl:justify-between">
      <CircleChart title="Bookings" data={allBookingStatusCount} horizontal />
      <ArrivalsAndDepartures data={arrivalsAndDeparturesToday} />
      <CircleChart title="Rooms" data={allRoomStatusCount} />
      <RoomTypesChart roomTypes={availableRoomsByRoomTypeCount} />
      <CircleChart title="Guests" data={personCount} />
      <CircleChart
        title="Housekeeping"
        data={allHousekeepingStatusCount}
        horizontal
      />
      <RevenueChart revenueData={revenueData} />
    </div>
  );
};

export default Dashboard;
