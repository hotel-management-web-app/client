import React from 'react';
import AddButton from '../../../components/Admin/AddButton';
import Header from '../../../components/Admin/Header';
import Table from '../../../components/Admin/Table';
import Seo from '../../../components/Seo';

const headers = [
  {
    id: 1,
    name: 'Room number',
  },
  {
    id: 2,
    name: 'Guest name',
  },
  {
    id: 3,
    name: 'Arrival date',
  },
  {
    id: 4,
    name: 'Departure day',
  },
  {
    id: 5,
    name: 'Status',
  },
  {
    id: 6,
    name: 'Action',
  },
];

const bookings = [
  {
    roomNumber: 1,
    guestName: 'Darth Vader',
    arrivalDate: '30.10.2022',
    departureDate: '30.11.2022',
    bookingStatus: 'confirmed',
  },
  {
    roomNumber: 2,
    guestName: 'Darth Vader',
    arrivalDate: '30.10.2022',
    departureDate: '30.11.2022',
    bookingStatus: 'pending',
  },
  {
    roomNumber: 3,
    guestName: 'Darth Vader',
    arrivalDate: '30.10.2022',
    departureDate: '30.11.2022',
    bookingStatus: 'cancelled',
  },
  {
    roomNumber: 4,
    guestName: 'Darth Vader',
    arrivalDate: '30.10.2022',
    departureDate: '30.11.2022',
    bookingStatus: 'not confirmed',
  },
];

const Bookings = () => (
  <div>
    <Seo title="Bookings" />
    <div className="flex justify-between">
      <Header title="Bookings" />
      <AddButton name="booking" />
    </div>
    <Table headers={headers} items={bookings} />
  </div>
);

export default Bookings;
