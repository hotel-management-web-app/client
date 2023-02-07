import React from 'react';
import { Cell, Pie, PieChart } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#757DF6'];

interface RoomTypesChartProps {
  roomTypes: {
    name: string;
    count: number;
  }[];
}

const RoomTypesChart: React.FC<RoomTypesChartProps> = ({ roomTypes }) => {
  const roomTypesChartData = roomTypes.map((roomType) => ({
    name: roomType.name,
    value: roomType.count,
  }));

  return (
    <div className="bg-white pl-4 pr-20 py-3 rounded-xl shadow-lg">
      <h2 className="font-medium text-lg">Available rooms by room type</h2>
      <div className="flex items-center gap-10 mt-3">
        <div className="flex justify-center relative px-10 py-5">
          <PieChart width={250} height={250}>
            <Pie
              data={roomTypesChartData}
              innerRadius={80}
              outerRadius={120}
              labelLine={false}
              fill="#8884d8"
              dataKey="value"
            >
              {roomTypesChartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <p className="absolute top-1/2 transform -translate-y-1/2 text-4xl">
            6
          </p>
        </div>
        <div>
          {roomTypesChartData.map((item, index) => (
            <div className="flex justify-between items-center w-64 mt-2 py-1 [&:not(:first-child)]:mt-5 [&:not(:last-child)]:border-b">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <p>{item.name}</p>
              </div>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomTypesChart;
