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

const rooms: {
  id: number;
  name: string;
  floor: number;
  occupancy: number;
  reservationStatus: string;
  price: string;
}[] = [
  {
    id: 1,
    name: 'Standard',
    floor: 1,
    occupancy: 4,
    price: '1200$',
    reservationStatus: 'Vacant',
  },
  {
    id: 2,
    name: 'Deluxe',
    floor: 1,
    occupancy: 5,
    price: '1500$',
    reservationStatus: 'Vacant',
  },
  {
    id: 3,
    name: 'Single',
    floor: 2,
    occupancy: 1,
    price: '1000$',
    reservationStatus: 'Vacant',
  },
];

const Rooms = () => (
  <div>
    <Seo title="Rooms" />
    <div className="flex justify-between">
      <Header title="Rooms" />
      <AddButton title="room" />
    </div>
    <Table headers={headers} items={rooms} />
  </div>
);

export default Rooms;
