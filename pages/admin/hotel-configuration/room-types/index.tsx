import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { nanoid } from 'nanoid';
import Seo from '../../../../components/Seo';
import Header from '../../../../components/Admin/Header';
import AddButton from '../../../../components/Admin/AddButton';
import Entries from '../../../../components/Admin/Entries';
import EditButton from '../../../../components/Admin/EditButton';
import DeleteButton from '../../../../components/Admin/DeleteButton';
import { getRoomTypes } from '../../../../lib/api/roomTypes';
import {
  useDeleteRoomType,
  useGetRoomTypes,
} from '../../../../lib/operations/roomTypes';

const headers: string[] = ['ID', 'Name', 'Occupancy', 'Price', 'Action'];

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], getRoomTypes);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const RoomTypes = () => {
  const { data } = useGetRoomTypes();

  const { mutate } = useDeleteRoomType();

  const deleteRoomTypeHandler = async (id: number) => {
    await mutate(id);
  };

  return (
    <div>
      <Seo title="Room Types" />
      <div className="flex justify-between">
        <Header title="Room types" />
        <AddButton name="room type" />
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
              {data?.map((roomType) => (
                <tr key={roomType.id} className="border-b">
                  <td>{roomType.id}</td>
                  <td>{roomType.name}</td>
                  <td>{roomType.occupancy}</td>
                  <td>{roomType.price}</td>
                  <td className="w-40 py-3">
                    <div>
                      <EditButton id={roomType.id} />
                      <DeleteButton
                        deleteHandler={() => deleteRoomTypeHandler(roomType.id)}
                      />
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

export default RoomTypes;
