import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Listbox, Transition } from '@headlessui/react';
import { BsPlusLg, BsChevronExpand, BsCheck } from 'react-icons/bs';
import Seo from '../../../../components/Seo';
import Header from '../../../../components/Admin/Header';

const entries = [
  {
    id: 1,
    value: 5,
  },
  {
    id: 2,
    value: 10,
  },
  {
    id: 3,
    value: 15,
  },
  {
    id: 4,
    value: 20,
  },
  {
    id: 5,
    value: 50,
  },
];

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
    name: 'Occupancy',
  },
  {
    id: 4,
    name: 'Price',
  },
  {
    id: 5,
    name: 'Action',
  },
];

const roomTypes = [
  {
    id: 1,
    name: 'Standard',
    occupancy: 4,
    price: '1200$',
  },
  {
    id: 2,
    name: 'Deluxe',
    occupancy: 5,
    price: '1500$',
  },
  {
    id: 3,
    name: 'Single',
    occupancy: 1,
    price: '1000$',
  },
];

const RoomTypes = () => {
  const [selectedEntry, setSelectedEntry] = useState(entries[0]);
  const router = useRouter();
  return (
    <div>
      <Seo title="Room Types" />
      <div className="flex justify-between">
        <Header title="Room types" />
        <Link href={`${router.pathname}/create`}>
          <a className="flex items-center gap-3 bg-black text-white px-4 rounded-lg text-lg py-2">
            <BsPlusLg />
            Add Room type
          </a>
        </Link>
      </div>
      <div className="bg-white px-5 py-7 mt-8 rounded-lg">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p>Show</p>
            <Listbox value={selectedEntry} onChange={setSelectedEntry}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-20 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selectedEntry.value}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <BsChevronExpand
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {entries.map((entry) => (
                      <Listbox.Option
                        key={entry.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-black' : 'text-gray-900'
                          }`
                        }
                        value={entry}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {entry.value}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                                <BsCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <p>Entries</p>
          </div>
          <div className="flex items-center gap-3">
            <p>Search</p>
            <input className="border rounded py-1" />
          </div>
        </div>
        <table className="table-auto w-full mt-8">
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
            {roomTypes.map((roomType) => (
              <tr key={roomType.id} className="border-b">
                <td>{roomType.id}</td>
                <td>{roomType.name}</td>
                <td>{roomType.occupancy}</td>
                <td>{roomType.price}</td>
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
      </div>
    </div>
  );
};

export default RoomTypes;