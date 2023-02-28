import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { RevenueData } from '../../../lib/types';

interface RevenueChartProps {
  revenueData: RevenueData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ revenueData }) => {
  const chartData = revenueData?.map((revenue) => ({
    name: revenue.month,
    value: Number(revenue.totalAmount),
  }));

  return (
    <div className=" bg-white rounded-xl shadow-lg pt-3 pb-10 w-full max-w-[760px]">
      <h2 className="font-medium text-lg ml-5 mb-2">Revenues</h2>
      <div className="overflow-auto">
        <div className="w-[760px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name="Revenue [$]"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
