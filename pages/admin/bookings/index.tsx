import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import moment from 'moment';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import { Entries } from '../../../components/Admin';
import AddButton from '../../../components/Admin/Table/AddButton';
import DeleteButton from '../../../components/Admin/Table/DeleteButton';
import EditButton from '../../../components/Admin/Table/EditButton';
import Header from '../../../components/Admin/Table/Header';
import Seo from '../../../components/Seo';
import Error from '../../../components/Error';
import { bookingStatuses } from '../../../constants/constants';
import { getBookings } from '../../../lib/api/bookings';
import {
  useDeleteBooking,
  useGetBookings,
} from '../../../lib/operations/bookings';
import ErrorMessage from '../../../components/ErrorMessage';
import Pagination from '../../../components/Admin/Table/Pagination';
import Search from '../../../components/Admin/Table/Search';

const headers = [
  'Id',
  'Room number',
  'Guest',
  'Arrival date',
  'Departure date',
  'Price',
  'Status',
  'Action',
];

const dateFormat = 'DD-MM-YYYY';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const page = context.query.page || 1;
  const limit = context.query.limit || 10;

  await queryClient.prefetchQuery(['bookings'], () =>
    getBookings(Number(page), Number(limit))
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Bookings: React.FC = () => {
  const router = useRouter();

  const { search } = router.query;
  const page = router.query.page || 1;
  const limit = router.query.limit || 10;

  const {
    data: bookingsData,
    isError: isBookingsError,
    error: bookingsError,
    refetch,
  } = useGetBookings(Number(page), Number(limit), search as string);

  const bookings = bookingsData?.bookings;
  const pageCount = bookingsData?.pageCount;

  useEffect(() => {
    refetch();
  }, [page, limit, search]);

  const {
    mutate,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteBooking();

  const deleteBooking = async (id: string) => {
    await mutate(id);
  };

  if (isBookingsError) return <Error message={bookingsError.message} />;

  return (
    <div>
      <Seo title="Bookings" />
      <div className="flex justify-between">
        <Header title="Bookings" />
        <AddButton name="booking" />
      </div>
      {isDeleteError && <ErrorMessage errorMessage={deleteError.message} />}
      <div className="bg-white px-5 py-7 mt-8 rounded-lg">
        <div className="flex justify-between flex-wrap gap-5">
          <Entries />
          <div className="flex items-center gap-3">
            <Search />
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
                const { id, arrivalDate, departureDate, status, totalPrice } =
                  booking;

                return (
                  <tr key={id} className="border-b">
                    <td>{id}</td>
                    <td>{roomNumber}</td>
                    <td>
                      {firstName}
                      &nbsp;
                      {lastName}
                    </td>
                    <td>{moment(arrivalDate).format(dateFormat)}</td>
                    <td>{moment(departureDate).format(dateFormat)}</td>
                    <td>{totalPrice / 100}$</td>
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
        <Pagination page={Number(page)} pageCount={pageCount!} />
      </div>
    </div>
  );
};

export default Bookings;
