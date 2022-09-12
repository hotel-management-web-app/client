import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiSelector } from 'react-icons/hi';
import DatePicker from './DatePicker';

const numberOfAdults = [
  { id: 1, number: 1 },
  { id: 2, number: 2 },
  { id: 3, number: 3 },
  { id: 4, number: 4 },
  { id: 5, number: 5 },
  { id: 6, number: 6 },
  { id: 7, number: 7 },
  { id: 8, number: 8 },
  { id: 9, number: 9 },
];

const numberOfChildren = [
  { id: 1, number: 0 },
  { id: 2, number: 1 },
  { id: 3, number: 2 },
  { id: 4, number: 3 },
  { id: 5, number: 4 },
  { id: 6, number: 5 },
  { id: 7, number: 6 },
  { id: 8, number: 7 },
  { id: 9, number: 8 },
  { id: 10, number: 9 },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Booking = () => {
  const [adultsNumber, setAdultsNumber] = useState(numberOfAdults[0]);
  const [childrenNumber, setChildrenNumber] = useState(numberOfChildren[0]);

  return (
    <form
      action="/room-booking"
      className="flex justify-center 2xl:justify-between flex-wrap items-end gap-8 max-w-container mx-auto text-xl"
    >
      <div>
        <Listbox value={adultsNumber} onChange={setAdultsNumber}>
          {({ open }) => (
            <>
              <Listbox.Label>Adults</Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button className="block border border-black text-black py-2 mt-4 w-64 bg-white">
                  <span className="flex items-center">
                    <span className="mx-auto block truncate">
                      {adultsNumber.number}
                    </span>
                  </span>
                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <HiSelector className="text-xl text-gray-600" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {numberOfAdults.map((number) => (
                      <Listbox.Option
                        key={number.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-gray-500' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9 text-center'
                          )
                        }
                        value={number}
                      >
                        {({ selected }) => (
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'mx-auto block truncate text-lg'
                              )}
                            >
                              {number.number}
                            </span>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <div>
        <Listbox value={childrenNumber} onChange={setChildrenNumber}>
          {({ open }) => (
            <>
              <Listbox.Label>Children</Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button className="block border border-black text-black py-2 mt-4 w-64 bg-white">
                  <span className="flex items-center">
                    <span className="mx-auto block truncate">
                      {childrenNumber.number}
                    </span>
                  </span>
                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <HiSelector className="text-xl text-gray-600" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {numberOfChildren.map((number) => (
                      <Listbox.Option
                        key={number.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-gray-500' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9 text-center'
                          )
                        }
                        value={number}
                      >
                        {({ selected }) => (
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'mx-auto block truncate text-lg'
                              )}
                            >
                              {number.number}
                            </span>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <DatePicker />
      <button className="bg-yellow-500 text-white h-[46px] px-5">
        Check availibitlity
      </button>
    </form>
  );
};

export default Booking;
