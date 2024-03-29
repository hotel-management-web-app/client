import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { BsCheck, BsRecordCircleFill } from 'react-icons/bs';
import { GoChevronDown } from 'react-icons/go';
import { useUpdateRoomField } from '../../../lib/operations/rooms';
import { PriorityStatusOption } from '../../../lib/types';
import { convertToOriginalForm } from '../../../utils/convertToOriginalForm';
import { priorityStatuses } from '../../../constants/constants';

const priorityStatusOptions: PriorityStatusOption[] = [
  {
    id: 1,
    name: 'High',
    color: '#EF4444',
  },
  {
    id: 2,
    name: 'Medium',
    color: '#F97316',
  },
  {
    id: 3,
    name: 'Low',
    color: '#9CA3AF',
  },
];

interface PriorityStatusProps {
  id: number;
  status: string;
}

const PriorityStatus: React.FC<PriorityStatusProps> = ({ id, status }) => {
  const [selectedPriority, setSelectedPriority] = useState(
    priorityStatusOptions.find(
      (priorityStatusOption) => priorityStatusOption.name === status
    )
  );

  const { mutate } = useUpdateRoomField(id);

  const changeHandler = (priorityStatus: PriorityStatusOption) => {
    setSelectedPriority(priorityStatus);
    const convertedPriorityStatus = convertToOriginalForm(
      priorityStatuses,
      priorityStatus.name
    );
    mutate({ priority: convertedPriorityStatus! });
  };

  return (
    <Listbox value={selectedPriority} onChange={changeHandler}>
      <div className="relative mt-1">
        <Listbox.Button
          id="priority-status"
          data-testid="priority-status"
          className="relative cursor-default rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 border w-40"
        >
          <span className="flex items-center gap-3 truncate">
            <BsRecordCircleFill style={{ color: selectedPriority?.color }} />
            {selectedPriority?.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <GoChevronDown
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
          <Listbox.Options className="absolute mt-1 max-h-60 w-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
            {priorityStatusOptions.map((priorityStatusOption) => (
              <Listbox.Option
                key={priorityStatusOption.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-gray-100 text-black' : 'text-gray-900'
                  }`
                }
                value={priorityStatusOption}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {priorityStatusOption.name}
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
  );
};

export default PriorityStatus;
