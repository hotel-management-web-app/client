import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import Seo from '../../../../components/Seo';
import Header from '../../../../components/Admin/Header';
import AddButton from '../../../../components/Admin/AddButton';
import EditButton from '../../../../components/Admin/EditButton';
import { Entries } from '../../../../components/Admin';
import DeleteButton from '../../../../components/Admin/DeleteButton';
import roomTypes from '../room-types';

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
    name: 'Floor',
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
    id: 4,
    name: 'Reservation Status',
  },
  {
    id: 5,
    name: 'Action',
  },
];

export const getServerSideProps = async () => {
  const data = await axios.get('/rooms').then((res) => res.data);

  return {
    props: { data },
  };
};

interface RoomsProps {
  data: {
    id: 1;
    name: 'Standard';
    floor: 1;
    occupancy: 4;
    price: '1200';
    reservationStatus: 'Vacant';
  }[];
}

const Rooms: React.FC<RoomsProps> = ({ data }) => {
  const { mutate } = useMutation(async (id: number) =>
    axios.delete(`/rooms/${id}`)
  );
  const router = useRouter();

  const deleteRoomType = async (id: number) => {
    await mutate(id);
    router.replace(router.asPath);
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
                  <th key={header.id} className="pb-2">
                    {header.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((room) => (
                <tr key={room.id} className="border-b">
                  <td>{room.id}</td>
                  <td>{room.name}</td>
                  <td>{room.occupancy}</td>
                  <td>{room.price}</td>
                  <td className="w-40 py-3">
                    <div>
                      <EditButton id={room.id} />
                      <DeleteButton
                        deleteHandler={() => deleteRoomType(room.id)}
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

export default Rooms;
