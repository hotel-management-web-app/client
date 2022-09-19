import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsPlusLg } from 'react-icons/bs';
import Seo from '../../../../components/Seo';
import Header from '../../../../components/Admin/Header';
import Entries from '../../../../components/Admin/Entries';
import TableWrapper from '../../../../components/Admin/TableWrapper';

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

const roomTypes: {
  id: number;
  name: string;
  occupancy: number;
  price: string;
}[] = [
  {
    id: 1,
    name: 'Standard',
    occupancy: 4,
    price: '1200$',
  },
  {
    id: 2,
    name: 'Deluxe',
    occupancy: 5,
    price: '1500$',
  },
  {
    id: 3,
    name: 'Single',
    occupancy: 1,
    price: '1000$',
  },
];

const RoomTypes = () => {
  const router = useRouter();
  return (
    <div>
      <Seo title="Room Types" />
      <div className="flex justify-between">
        <Header title="Room types" />
        <Link href={`${router.pathname}/create`}>
          <a className="flex items-center gap-3 bg-black text-white px-4 rounded-lg text-lg py-2">
            <BsPlusLg />
            Add Room type
          </a>
        </Link>
      </div>
      <TableWrapper>
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
                      <button className="bg-[#16D00B] text-white px-4 py-1 rounded-lg">
                        Edit
                      </button>
                      <button className="bg-[#FC3532] text-white px-4 py-1 rounded-lg ml-4">
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
      </TableWrapper>
    </div>
  );
};

export default RoomTypes;
