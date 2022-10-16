import React from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { Entries } from '../../../components/Admin';
import AddButton from '../../../components/Admin/AddButton';
import DeleteButton from '../../../components/Admin/DeleteButton';
import EditButton from '../../../components/Admin/EditButton';
import Header from '../../../components/Admin/Header';
import Seo from '../../../components/Seo';
import { getGuests } from '../../../lib/api/guests';
import { Guest } from '../../../lib/types';
import { useDeleteGuest } from '../../../lib/operations/guests';

const headers: string[] = [
  'Id',
  'Name',
  'Email',
  'Latest booking',
  'Bookings',
  'Status',
  'Action',
];

interface GuestsProps {
  guests: Guest[];
}

export const getServerSideProps = async () => {
  const guests = await getGuests();

  return { props: { guests } };
};

const Guests: React.FC<GuestsProps> = ({ guests }) => {
  const { mutate } = useDeleteGuest();
  const router = useRouter();

  const deleteGuest = async (id: number) => {
    await mutate(id);
    router.replace(router.asPath);
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
                  <th key={nanoid()} className="pb-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest.id} className="border-b">
                  <td>{guest.id}</td>
                  <td>
                    {guest.firstName}
                    &nbsp;
                    {guest.lastName}
                  </td>
                  <td>{guest.emailAddress}</td>
                  <td>{guest.latestBooking}</td>
                  <td>{guest.bookings}</td>
                  <td>{guest.status}</td>
                  <td className="w-40 py-3">
                    <div>
                      <EditButton id={guest.id} />
                      <DeleteButton
                        deleteHandler={() => deleteGuest(guest.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {guests.length === 0 && (
            <p className="text-center mt-5">No data available in table</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guests;
