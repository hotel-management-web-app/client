import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { BsCheck, BsChevronExpand } from 'react-icons/bs';

const roomTypes: {
  id: number;
  name: string;
}[] = [
  {
    id: 1,
    name: 'Standard',
  },
  {
    id: 2,
    name: 'Deluxe',
  },
  {
    id: 3,
    name: 'Single',
  },
];

const ListboxInput = () => {
  const [selectedItem, setSelectedItem] = useState(roomTypes[0]);
  return (
    <div>
      <label htmlFor="room-type" className="mt-5">
        Room type
      </label>
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <div className="relative mt-1">
          <Listbox.Button
            id="room-type"
            className="relative cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 border w-full"
          >
            <span className="block truncate">{selectedItem.name}</span>
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
              {roomTypes.map((roomType) => (
                <Listbox.Option
                  key={roomType.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-100 text-black' : 'text-gray-900'
                    }`
                  }
                  value={roomType}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {roomType.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                          <BsCheck className="h-5 w-5" aria-hidden="true" />
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
    </div>
  );
};

export default ListboxInput;
