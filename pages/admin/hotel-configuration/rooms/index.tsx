import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { nanoid } from 'nanoid';
import Seo from '../../../../components/Seo';
import Header from '../../../../components/Admin/Header';
import AddButton from '../../../../components/Admin/AddButton';
import EditButton from '../../../../components/Admin/EditButton';
import { Entries } from '../../../../components/Admin';
import DeleteButton from '../../../../components/Admin/DeleteButton';
import { useDeleteRoom, useGetRooms } from '../../../../lib/operations/rooms';
import { getRooms } from '../../../../lib/api/rooms';

const headers: string[] = [
  'Id',
  'Room type',
  'Room number',
  'Floor number',
  'Reservation Status',
  'Action',
];

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['rooms'], getRooms);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Rooms = () => {
  const { data } = useGetRooms();
  const { mutate } = useDeleteRoom();

  const deleteRoom = async (id: number) => {
    await mutate(id);
  };

  return (
    <div>
      <Seo title="Rooms" />
      <div className="flex justify-between">
        <Header title="Rooms" />
        <AddButton name="room" />
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
              {data?.map((room) => (
                <tr key={room.id} className="border-b">
                  <td>{room.id}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.floorNumber}</td>
                  <td>{room.roomStatus}</td>
                  <td className="w-40 py-3">
                    <div>
                      <EditButton id={room.id} />
                      <DeleteButton deleteHandler={() => deleteRoom(room.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data?.length === 0 && (
            <p className="text-center mt-5">No data available in table</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
