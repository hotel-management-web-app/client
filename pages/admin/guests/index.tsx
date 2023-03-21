import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import moment from 'moment';
import { Entries } from '../../../components/Admin';
import AddButton from '../../../components/Admin/Table/AddButton';
import DeleteButton from '../../../components/Admin/Table/DeleteButton';
import EditButton from '../../../components/Admin/Table/EditButton';
import Header from '../../../components/Admin/Table/Header';
import Seo from '../../../components/Seo';
import Error from '../../../components/Error';
import { getGuests } from '../../../lib/api/guests';
import { useDeleteGuest, useGetGuests } from '../../../lib/operations/guests';
import { guestStatuses } from '../../../constants/constants';
import ErrorMessage from '../../../components/ErrorMessage';
import Pagination from '../../../components/Admin/Table/Pagination';

const headers: string[] = [
  'Id',
  'Name',
  'Email',
  'Latest booking',
  'Bookings',
  'Status',
  'Action',
];

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const page = context.query.page || 1;
  const limit = context.query.limit || 10;

  await queryClient.prefetchQuery(['guests'], () =>
    getGuests(Number(page), Number(limit))
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Guests = () => {
  const router = useRouter();

  const page = router.query.page || 1;
  const limit = router.query.limit || 10;

  const {
    data: guestsData,
    isError: isGuestsError,
    error: guestsError,
    refetch,
  } = useGetGuests(Number(page), Number(limit));

  const guests = guestsData?.guests;
  const pageCount = guestsData?.pageCount;

  useEffect(() => {
    refetch();
  }, [page, limit]);

  const {
    mutate,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteGuest();

  const deleteGuest = async (id: number) => {
    await mutate(id);
  };

  if (isGuestsError) return <Error message={guestsError.message} />;

  return (
    <div>
      <Seo title="Guests" />
      <div className="flex justify-between">
        <Header title="Guests" />
        <AddButton name="guest" />
      </div>
      {isDeleteError && <ErrorMessage errorMessage={deleteError.message} />}
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
              {guests?.map(
                ({
                  id,
                  firstName,
                  lastName,
                  email,
                  lastBooking,
                  _count,
                  status,
                }) => (
                  <tr key={id} className="border-b">
                    <td>{id}</td>
                    <td>
                      {firstName}
                      &nbsp;
                      {lastName}
                    </td>
                    <td>{email}</td>
                    <td>{moment(lastBooking).format('DD-MM-YYYY')}</td>
                    <td>{_count?.bookings}</td>
                    <td>{guestStatuses[status]}</td>
                    <td className="w-40 py-3">
                      <div>
                        <EditButton id={id!} />
                        <DeleteButton deleteHandler={() => deleteGuest(id!)} />
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {guests?.length === 0 && (
            <p className="text-center mt-5">No data available in table</p>
          )}
        </div>
        <Pagination page={Number(page)} pageCount={pageCount!} />
      </div>
    </div>
  );
};

export default Guests;
