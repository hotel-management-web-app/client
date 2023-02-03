import moment from 'moment';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { Entries } from '../../../components/Admin';
import AddButton from '../../../components/Admin/AddButton';
import DeleteButton from '../../../components/Admin/DeleteButton';
import EditButton from '../../../components/Admin/EditButton';
import Header from '../../../components/Admin/Header';
import Seo from '../../../components/Seo';
import { bookingStatuses } from '../../../constants/constants';
import { getBookings } from '../../../lib/api/bookings';
import {
  useDeleteBooking,
  useGetBookings,
} from '../../../lib/operations/bookings';
import { Booking } from '../../../lib/types';

const headers = [
  'Room number',
  'Guest',
  'Arrival date',
  'Departure date',
  'Status',
  'Action',
];

const dateFormat = 'DD-MM-YYYY';

export interface BookingsProps {
  bookings: Booking[];
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['bookings'], getBookings);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Bookings: React.FC<BookingsProps> = () => {
  const { data: bookings } = useGetBookings();
  const { mutate } = useDeleteBooking();

  const deleteBooking = async (id: number) => {
    await mutate(id);
  };
  return (
    <div>
      <Seo title="Bookings" />
      <div className="flex justify-between">
        <Header title="Bookings" />
        <AddButton name="booking" />
      </div>
      <div className="bg-white px-5 py-7 mt-8 rounded-lg">
        <div className="flex justify-between flex-wrap gap-5">
          <Entries />
          <div className="flex items-center gap-3">
            <p>Search</p>
            <input className="border rounded py-1" />
          </div>
        </div>
        <div className="overflow-auto">
          <table className="table-auto min-w-[500px] w-full mt-8">
            <thead className="text-left">
              <tr className="border-b">
                {headers.map((header) => (
                  <th key={header} className="pb-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => {
                const { roomNumber } = booking.room;
                const { firstName, lastName } = booking.guest;
                const { id, arrivalDate, departureDate, status } = booking;
                return (
                  <tr key={id} className="border-b">
                    <td>{roomNumber}</td>
                    <td>
                      {firstName}
                      &nbsp;
                      {lastName}
                    </td>
                    <td>{moment(arrivalDate).format(dateFormat)}</td>
                    <td>{moment(departureDate).format(dateFormat)}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: bookingStatuses[status].color,
                        }}
                        className="px-3 py-1 rounded text-white capitalize"
                      >
                        {bookingStatuses[status].convertedName}
                      </span>
                    </td>
                    <td className="w-40 py-3">
                      <div>
                        <EditButton id={id!} />
                        <DeleteButton
                          deleteHandler={() => deleteBooking(id!)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {bookings?.length === 0 && (
            <p className="text-center mt-5">No data available in table</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
