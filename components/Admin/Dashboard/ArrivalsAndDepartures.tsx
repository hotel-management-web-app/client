import React from 'react';
import { Booking } from '../../../lib/types';

interface ArrivalsAndDeparturesProps {
  data: {
    arrivalsToday: Booking[];
    departuresToday: Booking[];
  };
}

const ArrivalsAndDepartures: React.FC<ArrivalsAndDeparturesProps> = ({
  data,
}) => {
  const { arrivalsToday, departuresToday } = data;
  return (
    <div className="bg-white rounded-xl shadow-lg px-3 py-2 flex gap-5">
      <div className="w-64 overflow-auto">
        <h2 className="font-medium text-lg">
          Arrivals Today ({arrivalsToday.length})
        </h2>
        {arrivalsToday.map((arrival) => (
          <div className="flex even:bg-gray-100 px-2 py-1 rounded">
            <div>
              <p>
                {arrival.guest.firstName} {arrival.guest.lastName}
              </p>
              <p className="text-sm">
                {arrival.room.roomNumber} - {arrival.room.roomType.name}
              </p>
            </div>
          </div>
        ))}
        {arrivalsToday.length === 0 && (
          <div className="text-center text-gray-500 mt-1">
            There are no arrivals today
          </div>
        )}
      </div>
      <div className="w-64 overflow-auto">
        <h2 className="font-medium text-lg">
          Departures Today ({departuresToday.length})
        </h2>
        {departuresToday.map((departure) => (
          <div className="flex even:bg-gray-100 px-2 py-1 rounded">
            <div>
              <p>
                {departure.guest.firstName} {departure.guest.lastName}
              </p>
              <p className="text-sm">
                {departure.room.roomNumber} - {departure.room.roomType.name}
              </p>
            </div>
          </div>
        ))}
        {departuresToday.length === 0 && (
          <div className="text-center text-gray-500 mt-1">
            There are no departures today
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrivalsAndDepartures;
