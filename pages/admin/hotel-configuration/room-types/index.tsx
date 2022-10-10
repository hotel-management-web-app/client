import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useMutation } from 'react-query';
import Seo from '../../../../components/Seo';
import Header from '../../../../components/Admin/Header';
import AddButton from '../../../../components/Admin/AddButton';
import Entries from '../../../../components/Admin/Entries';

const headers: { id: number; name: string }[] = [
  {
    id: 1,
    name: 'Id',
  },
  {
    id: 2,
    name: 'Name',
  },
  {
    id: 3,
    name: 'Occupancy',
  },
  {
    id: 4,
    name: 'Price',
  },
  {
    id: 5,
    name: 'Action',
  },
];

export const getServerSideProps = async () => {
  const data = await axios.get('/room-types').then((res) => res.data);

  return { props: { roomTypes: data } };
};

interface RoomTypesProps {
  roomTypes: {
    id: number;
    name: string;
    occupancy: number;
    price: string;
  }[];
}

const RoomTypes: React.FC<RoomTypesProps> = ({ roomTypes }) => {
  const { mutate } = useMutation((id: number) =>
    axios.delete(`/room-types/${id}`)
  );
  const router = useRouter();

  const deleteRoomType = (id: number) => {
    mutate(id);
    router.reload();
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
                  <th key={header.id} className="pb-2">
                    {header.name}
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
                      <Link href={`${router.pathname}/edit/${roomType.id}`}>
                        <a className="bg-[#16D00B] text-white px-4 py-1 rounded-lg">
                          Edit
                        </a>
                      </Link>
                      <button
                        className="bg-[#FC3532] text-white px-4 py-1 rounded-lg ml-4"
                        onClick={() => deleteRoomType(roomType.id)}
                      >
                        Delete
                      </button>
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
