import React from 'react';
import AddButton from '../../../components/Admin/AddButton';
import Header from '../../../components/Admin/Header';
import Table from '../../../components/Admin/Table';
import Seo from '../../../components/Seo';

const headers = [
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
    name: 'Email',
  },
  {
    id: 4,
    name: 'Latest booking',
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

const guests = [
  {
    id: 1,
    name: 'Darth Vader',
    email: 'darthvader@gmail.com',
    latestBooking: '30.10.2022',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Darth Vader',
    email: 'darthvader@gmail.com',
    latestBooking: '30.10.2022',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Darth Vader',
    email: 'darthvader@gmail.com',
    latestBooking: '30.10.2022',
    status: 'Active',
  },
];

const Guests = () => (
  <div>
    <Seo title="Guests" />
    <div className="flex justify-between">
      <Header title="Guests" />
      <AddButton name="guest" />
    </div>
    <Table headers={headers} items={guests} />
  </div>
);

export default Guests;
