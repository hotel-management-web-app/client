import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Chart, ChartDataProps, DashboardData } from '../../lib/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface DashboardProps {
  dashboardData: DashboardData;
}

const getChartData = (data: ChartDataProps) => {
  const chartData = Object.keys(data).map((key) => ({
    name: (key.charAt(0).toUpperCase() + key.slice(1))
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/<[A-Z]/, ''),
    value: data[key],
  }));

  return chartData;
};

const getChartDataSum = (chartData: Chart[]) => {
  const sum = chartData.reduce((acc, current) => {
    let prev = acc;
    if (typeof prev === 'object') prev = prev.value;

    return prev + current.value;
  });

  return sum;
};

const Dashboard: React.FC<DashboardProps> = ({ dashboardData }) => {
  const {
    personCount,
    allRoomStatusCount,
    arrivalsAndDeparturesToday,
    allBookingStatusCount,
    allHousekeepingStatusCount,
  } = dashboardData || {};

  const personCountChartData = getChartData(personCount);
  const allPersonsSum = getChartDataSum(personCountChartData);

  const roomsCountChartData = getChartData(allRoomStatusCount);
  const allRoomsSum = getChartDataSum(roomsCountChartData);

  const bookingsCountChartData = getChartData(allBookingStatusCount);
  const allBookingsSum = getChartDataSum(bookingsCountChartData);

  const housekeepingCountChartData = getChartData(allHousekeepingStatusCount);
  const allHousekeepingSum = getChartDataSum(housekeepingCountChartData);

  return (
    <div className="mt-10 flex items-start flex-wrap gap-10">
      <div className="w-80 bg-white px-3 py-2 rounded-xl shadow-lg">
        <h2 className="font-medium text-lg">Guests</h2>
        <div className="flex justify-center relative">
          <PieChart width={200} height={200}>
            <Pie
              data={personCountChartData}
              innerRadius={50}
              outerRadius={80}
              labelLine={false}
              fill="#8884d8"
              dataKey="value"
            >
              {personCountChartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <p className="absolute top-1/2 transform -translate-y-1/2 text-2xl">
            {Number(allPersonsSum)}
          </p>
        </div>
        <div>
          {personCountChartData.map((personsData, index) => (
            <div className="flex justify-between items-center w-full mt-2 py-1 [&:not(:last-child)]:border-b">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <p>{personsData.name}</p>
              </div>
              <p>{personsData.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-80 bg-white px-3 py-2 rounded-xl shadow-lg">
        <h2 className="font-medium text-lg">Rooms</h2>
        <div className="flex justify-center relative">
          <PieChart width={200} height={200}>
            <Pie
              data={roomsCountChartData}
              innerRadius={50}
              outerRadius={80}
              labelLine={false}
              fill="#8884d8"
              dataKey="value"
            >
              {roomsCountChartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <p className="absolute top-1/2 transform -translate-y-1/2 text-2xl">
            {Number(allRoomsSum)}
          </p>
        </div>
        <div>
          {roomsCountChartData.map((personsData, index) => (
            <div className="flex justify-between items-center w-full mt-2 py-1 [&:not(:last-child)]:border-b">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <p>{personsData.name}</p>
              </div>
              <p>{personsData.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg px-3 py-2 flex gap-5">
        <div className="w-64 overflow-auto">
          <h2 className="font-medium text-lg">
            Arrivals Today ({arrivalsAndDeparturesToday.arrivalsToday.length})
          </h2>
          {arrivalsAndDeparturesToday.arrivalsToday.map((arrival) => (
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
          {arrivalsAndDeparturesToday.arrivalsToday.length === 0 && (
            <div className="text-center text-gray-500 mt-1">
              There are no arrivals today
            </div>
          )}
        </div>
        <div className="w-64 overflow-auto">
          <h2 className="font-medium text-lg">
            Departures Today (
            {arrivalsAndDeparturesToday.departuresToday.length})
          </h2>
          {arrivalsAndDeparturesToday.departuresToday.map((departure) => (
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
          {arrivalsAndDeparturesToday.departuresToday.length === 0 && (
            <div className="text-center text-gray-500 mt-1">
              There are no departures today
            </div>
          )}
        </div>
      </div>
      <div className="bg-white pl-3 pr-10 py-2 rounded-xl shadow-lg">
        <h2 className="font-medium text-lg">Bookings</h2>
        <div className="flex items-center gap-5">
          <div className="flex justify-center relative">
            <PieChart width={200} height={200}>
              <Pie
                data={bookingsCountChartData}
                innerRadius={50}
                outerRadius={80}
                labelLine={false}
                fill="#8884d8"
                dataKey="value"
              >
                {bookingsCountChartData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <p className="absolute top-1/2 transform -translate-y-1/2 text-2xl">
              {Number(allBookingsSum)}
            </p>
          </div>
          <div>
            {bookingsCountChartData.map((personsData, index) => (
              <div className="flex justify-between items-center w-64 mt-2 py-1 [&:not(:last-child)]:border-b">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <p>{personsData.name}</p>
                </div>
                <p>{personsData.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white pl-3 pr-10 py-2 rounded-xl shadow-lg">
        <h2 className="font-medium text-lg">Housekeeping</h2>
        <div className="flex items-center gap-5">
          <div className="flex justify-center relative">
            <PieChart width={200} height={200}>
              <Pie
                data={housekeepingCountChartData}
                innerRadius={50}
                outerRadius={80}
                labelLine={false}
                fill="#8884d8"
                dataKey="value"
              >
                {housekeepingCountChartData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <p className="absolute top-1/2 transform -translate-y-1/2 text-2xl">
              {Number(allHousekeepingSum)}
            </p>
          </div>
          <div>
            {housekeepingCountChartData.map((personsData, index) => (
              <div className="flex justify-between items-center w-64 mt-2 py-1 [&:not(:last-child)]:border-b">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <p>{personsData.name}</p>
                </div>
                <p>{personsData.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
