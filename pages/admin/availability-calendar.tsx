import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { Header } from '../../components/Admin';
import Seo from '../../components/Seo';
import { getRoomTypes } from '../../lib/api/roomTypes';
import { useGetRoomTypes } from '../../lib/operations/roomTypes';
import { getBookings } from '../../lib/api/bookings';
import { useGetBookings } from '../../lib/operations/bookings';
import AvailabilityCalendar from '../../components/Admin/AvailabilityCalendar/AvailabilityCalendar';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], getRoomTypes);
  await queryClient.prefetchQuery(['bookings'], getBookings);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const AvailabilityCalendarPage = () => {
  const { data: roomTypes } = useGetRoomTypes();
  const { data: bookings } = useGetBookings();

  return (
    <div>
      <Seo title="Availability Calendar" />
      <div className="flex justify-between">
        <Header title="Availability Calendar" />
      </div>
      <div className="mt-5">
        <AvailabilityCalendar roomTypes={roomTypes} bookingsProp={bookings} />
      </div>
    </div>
  );
};

export default AvailabilityCalendarPage;
