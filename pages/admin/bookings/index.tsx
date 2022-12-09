import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import AddButton from '../../../components/Admin/AddButton';
import DeleteButton from '../../../components/Admin/DeleteButton';
import EditButton from '../../../components/Admin/EditButton';
import Header from '../../../components/Admin/Header';
import Seo from '../../../components/Seo';
import { bookingStatuses } from '../../../constants/constants';
import { getBookings } from '../../../lib/api/bookings';
import { useDeleteBooking } from '../../../lib/operations/bookings';
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
  const bookings = await getBookings();

  return {
    props: { bookings },
  };
};

const Bookings: React.FC<BookingsProps> = ({ bookings }) => {
  const { mutate } = useDeleteBooking();
  const router = useRouter();

  const deleteBooking = async (id: number) => {
    await mutate(id);
    router.replace(router.asPath);
  };
  return (
    <div>
      <Seo title="Bookings" />
      <div className="flex justify-between">
        <Header title="Bookings" />
        <AddButton name="booking" />
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
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td>{booking.roomNumber}</td>
                <td>{booking.guestName}</td>
                <td>{moment(booking.arrivalDate).format(dateFormat)}</td>
                <td>{moment(booking.departureDate).format(dateFormat)}</td>
                <td>
                  <span
                    style={{
                      backgroundColor: bookingStatuses[booking.status].color,
                    }}
                    className="px-3 py-1 rounded text-white capitalize"
                  >
                    {bookingStatuses[booking.status].convertedName}
                  </span>
                </td>
                <td className="w-40 py-3">
                  <div>
                    <EditButton id={booking.id!} />
                    <DeleteButton
                      deleteHandler={() => deleteBooking(booking.id!)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <p className="text-center mt-5">No data available in table</p>
        )}
      </div>
    </div>
  );
};

export default Bookings;
