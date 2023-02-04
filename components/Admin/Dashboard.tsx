import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { DashboardData } from '../../lib/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface DashboardProps {
  dashboardData: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ dashboardData }) => {
  const { personCount } = dashboardData;

  const personCountChartData = Object.keys(personCount).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: personCount[key],
  }));
  const allPersonsSum = personCountChartData.reduce(
    (acc, current) => acc.value + current.value
  );

  return (
    <div className="mt-10">
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
            <div className="flex justify-between items-center w-full mt-2 py-1 first:border-b">
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
  );
};

export default Dashboard;
