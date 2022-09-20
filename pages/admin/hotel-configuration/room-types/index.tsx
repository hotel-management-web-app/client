import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsPlusLg } from 'react-icons/bs';
import Seo from '../../../../components/Seo';
import Header from '../../../../components/Admin/Header';
import Table from '../../../../components/Admin/Table';

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
      <Table headers={headers} items={roomTypes} />
    </div>
  );
};

export default RoomTypes;
