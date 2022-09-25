import React from 'react';
import Entries from './Entries';

const bookingStatusColores: { [key: string]: string } = {
  confirmed: '#22C55E',
  pending: '#FB923C',
  cancelled: '#EF4444',
  notConfirmed: '#9CA3AF',
};

const camelize = (str: string): string =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) =>
      // eslint-disable-next-line prettier/prettier
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '');

interface TableProps {
  headers: { id: number; name: string }[];
  items: any[];
}

const Table: React.FC<TableProps> = ({ headers, items }) => (
  <div className="bg-white px-5 py-7 mt-8 rounded-lg">
    <div className="flex justify-between flex-wrap gap-5">
      <Entries />
      <div className="flex items-center gap-3">
        <p>Search</p>
        <input className="border rounded py-1" />
      </div>
    </div>
    <div className="overflow-auto">
      <table className="table-auto min-w-[500px] w-full mt-8">
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
          {items.map((item) => (
            <tr key={item.id} className="border-b">
              {Object.keys(item).map((key) => {
                if (key === 'bookingStatus') {
                  return (
                    <td className="">
                      <span
                        style={{
                          backgroundColor:
                            bookingStatusColores[camelize(item[key])],
                        }}
                        className="px-3 py-1 rounded text-white capitalize"
                      >
                        {item[key]}
                      </span>
                    </td>
                  );
                }

                return <td className="">{item[key]}</td>;
              })}
              <td className="w-40 py-3">
                <div>
                  <button className="bg-[#16D00B] text-white px-4 py-1 rounded-lg">
                    Edit
                  </button>
                  <button className="bg-[#FC3532] text-white px-4 py-1 rounded-lg ml-4">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && (
        <p className="text-center mt-5">No data available in table</p>
      )}
    </div>
  </div>
);

export default Table;
