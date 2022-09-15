import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import { BsPlusLg, BsChevronExpand, BsCheck } from 'react-icons/bs';
import Seo from '../../../components/Seo';

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

const RoomTypes = () => {
  const [selectedEntry, setSelectedEntry] = useState(entries[0]);
  return (
    <div>
      <Seo title="Room Types" />
      <div className="flex justify-between">
        <h1 className="text-2xl">Room Types</h1>
        <Link href="#">
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
        <table className="table-auto w-full mt-5">
          <thead className="text-left">
            <tr className="border-b">
              <th>id</th>
              <th>Name</th>
              <th>Occupancy</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td>1</td>
              <td>Standard</td>
              <td>4</td>
              <td>1200$</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomTypes;
