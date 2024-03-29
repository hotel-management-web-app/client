import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { Header } from '../../components/Admin';
import Seo from '../../components/Seo';
import Error from '../../components/Error';
import { getRoomTypes } from '../../lib/api/roomTypes';
import { useGetRoomTypes } from '../../lib/operations/roomTypes';
import { getBookings } from '../../lib/api/bookings';
import { useGetBookings } from '../../lib/operations/bookings';
import AvailabilityCalendar from '../../components/Admin/AvailabilityCalendar';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], () => getRoomTypes());
  await queryClient.prefetchQuery(['bookings'], () => getBookings());

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const AvailabilityCalendarPage = () => {
  const {
    data: roomTypesData,
    isError: isRoomTypesError,
    error: roomTypesError,
  } = useGetRoomTypes();
  const {
    data: bookingsData,
    isError: isBookingsError,
    error: bookingsError,
  } = useGetBookings();

  if (isRoomTypesError) return <Error message={roomTypesError.message} />;
  if (isBookingsError) return <Error message={bookingsError.message} />;

  return (
    <div>
      <Seo title="Availability Calendar" />
      <div className="flex justify-between">
        <Header title="Availability Calendar" />
      </div>
      <div className="mt-5">
        <AvailabilityCalendar
          roomTypes={roomTypesData?.roomTypes}
          bookingsProp={bookingsData?.bookings}
        />
      </div>
    </div>
  );
};

export default AvailabilityCalendarPage;
