import React from 'react';
import Header from '../../components/Admin/Header';
import HousekeepingStatus from '../../components/Admin/HousekeepingStatus';
import PriorityStatus from '../../components/Admin/PriorityStatus';
import Seo from '../../components/Seo';

const headers = [
  {
    id: 1,
    name: 'Room',
  },
  {
    id: 2,
    name: 'Room Type',
  },
  {
    id: 3,
    name: 'Housekeeping Status',
  },
  {
    id: 4,
    name: 'Priority',
  },
  {
    id: 5,
    name: 'Floor',
  },
  {
    id: 6,
    name: 'Reservation Status',
  },
  {
    id: 7,
    name: 'Comments and notes',
  },
];

const rooms = [
  {
    id: 1,
    roomNumber: 1,
    roomType: 'Family room',
    housekeepingStatus: 'Cleaning',
    priority: 'High',
    floor: 2,
    reservationStatus: 'Vacant',
    comments: 'Wash windows',
  },
  {
    id: 2,
    roomNumber: 1,
    roomType: 'Family room',
    housekeepingStatus: 'Cleaning',
    priority: 'High',
    floor: 2,
    reservationStatus: 'Vacant',
    comments: 'Wash windows',
  },
  {
    id: 3,
    roomNumber: 1,
    roomType: 'Family room',
    housekeepingStatus: 'Cleaning',
    priority: 'High',
    floor: 2,
    reservationStatus: 'Vacant',
    comments: 'Wash windows',
  },
  {
    id: 4,
    roomNumber: 1,
    roomType: 'Family room',
    housekeepingStatus: 'Cleaning',
    priority: 'High',
    floor: 2,
    reservationStatus: 'Vacant',
    comments: 'Wash windows',
  },
];

const Housekeeping = () => (
  <div>
    <Seo title="Housekeeping" />
    <Header title="Housekeeping" />
    <div className="overflow-auto px-5 py-7 mt-8 bg-white rounded-lg">
      <table className="table-auto min-w-[500px] w-full">
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
          {rooms.map((room) => (
            <tr key={room.id} className="border-b">
              <td className="py-3">{room.roomNumber}</td>
              <td className="py-3">{room.roomType}</td>
              <td className="py-3">
                <HousekeepingStatus />
              </td>
              <td className="py-3">
                <PriorityStatus />
              </td>
              <td className="py-3">{room.floor}</td>
              <td className="py-3">{room.reservationStatus}</td>
              <td className="py-3">{room.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Housekeeping;
