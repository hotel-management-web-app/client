import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { Entries } from '../../../components/Admin';
import AddButton from '../../../components/Admin/AddButton';
import DeleteButton from '../../../components/Admin/DeleteButton';
import EditButton from '../../../components/Admin/EditButton';
import Header from '../../../components/Admin/Header';
import Seo from '../../../components/Seo';
import { getGuests } from '../../../lib/api/guests';
import { useDeleteGuest, useGetGuests } from '../../../lib/operations/guests';
import { guestStatuses } from '../../../constants/constants';

const headers: string[] = [
  'Id',
  'Name',
  'Email',
  'Latest booking',
  'Bookings',
  'Status',
  'Action',
];

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['guests'], getGuests);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Guests = () => {
  const { data: guests } = useGetGuests();
  const { mutate } = useDeleteGuest();

  const deleteGuest = async (id: number) => {
    await mutate(id);
  };

  return (
    <div>
      <Seo title="Guests" />
      <div className="flex justify-between">
        <Header title="Guests" />
        <AddButton name="guest" />
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
                    <td>{lastBooking}</td>
                    <td>{_count.bookings}</td>
                    <td>{guestStatuses[status]}</td>
                    <td className="w-40 py-3">
                      <div>
                        <EditButton id={id} />
                        <DeleteButton deleteHandler={() => deleteGuest(id)} />
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
      </div>
    </div>
  );
};

export default Guests;
