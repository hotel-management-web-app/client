import React from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { nanoid } from 'nanoid';
import Seo from '../../../../components/Seo';
import Header from '../../../../components/Admin/Header';
import AddButton from '../../../../components/Admin/AddButton';
import Entries from '../../../../components/Admin/Entries';
import EditButton from '../../../../components/Admin/EditButton';
import DeleteButton from '../../../../components/Admin/DeleteButton';
import { getRoomTypes, deleteRoomType } from '../../../../lib/api/roomTypes';

const headers: string[] = ['ID', 'Name', 'Occupancy', 'Price', 'Action'];

interface RoomTypesProps {
  roomTypes: {
    id: number;
    name: string;
    occupancy: number;
    price: string;
  }[];
}

export const getServerSideProps = async () => {
  const data = await getRoomTypes();

  return { props: { roomTypes: data } };
};

const RoomTypes: React.FC<RoomTypesProps> = ({ roomTypes }) => {
  const { mutate } = useMutation(async (id: number) => deleteRoomType(id));
  const router = useRouter();

  const deleteRoomTypeHandler = async (id: number) => {
    await mutate(id);
    router.replace(router.asPath);
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
              {roomTypes.map((roomType) => (
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
          {roomTypes.length === 0 && (
            <p className="text-center mt-5">No data available in table</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomTypes;
