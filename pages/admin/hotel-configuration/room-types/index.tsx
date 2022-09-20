import React from 'react';
import Seo from '../../../../components/Seo';
import Header from '../../../../components/Admin/Header';
import Table from '../../../../components/Admin/Table';
import AddButton from '../../../../components/Admin/AddButton';

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

const RoomTypes = () => (
  <div>
    <Seo title="Room Types" />
    <div className="flex justify-between">
      <Header title="Room types" />
      <AddButton title="room type" />
    </div>
    <Table headers={headers} items={roomTypes} />
  </div>
);

export default RoomTypes;
