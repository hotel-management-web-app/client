import React from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { Chart, ChartDataProps } from '../../../lib/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

interface CircleChartProps {
  title: string;
  data: {
    [key: string]: number;
  };
  horizontal?: boolean;
}

const CircleChart: React.FC<CircleChartProps> = ({
  title,
  data,
  horizontal,
}) => {
  const chartData = getChartData(data);
  const dataSum = getChartDataSum(chartData);

  if (horizontal) {
    return (
      <div className="bg-white pl-3 pr-10 py-2 rounded-xl shadow-lg">
        <h2 className="font-medium text-lg">{title}</h2>
        <div className="flex items-center gap-5">
          <div className="flex justify-center relative">
            <PieChart width={200} height={200}>
              <Pie
                data={chartData}
                innerRadius={50}
                outerRadius={80}
                labelLine={false}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <p className="absolute top-1/2 transform -translate-y-1/2 text-2xl">
              {Number(dataSum)}
            </p>
          </div>
          <div>
            {chartData.map((item, index) => (
              <div className="flex justify-between items-center w-64 mt-2 py-1 [&:not(:last-child)]:border-b">
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
  }

  return (
    <div className="w-80 bg-white px-3 py-2 rounded-xl shadow-lg">
      <h2 className="font-medium text-lg">{title}</h2>
      <div className="flex justify-center relative">
        <PieChart width={200} height={200}>
          <Pie
            data={chartData}
            innerRadius={50}
            outerRadius={80}
            labelLine={false}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <p className="absolute top-1/2 transform -translate-y-1/2 text-2xl">
          {Number(dataSum)}
        </p>
      </div>
      <div>
        {chartData.map((item, index) => (
          <div className="flex justify-between items-center w-full mt-2 py-1 [&:not(:last-child)]:border-b">
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
  );
};

export default CircleChart;
