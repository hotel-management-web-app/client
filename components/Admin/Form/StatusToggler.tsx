import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useFormContext } from 'react-hook-form';
import camelize from '../../../utils/camelize';

interface StatusTogglerProps {
  id: string;
  label: string;
  checkedValue: string;
  uncheckedValue: string;
  defaultStatus?: boolean;
}

const StatusToggler: React.FC<StatusTogglerProps> = ({
  id,
  label,
  checkedValue,
  uncheckedValue,
  defaultStatus = true,
}) => {
  const [checked, setChecked] = useState(defaultStatus);
  const { setValue } = useFormContext();

  setValue(camelize(label), checked ? checkedValue : uncheckedValue);

  return (
    <div>
      <label htmlFor={id} className="block mb-1">
        {label}
      </label>
      <Switch
        id={id}
        checked={checked}
        onChange={setChecked}
        className={`${
          checked ? 'bg-green-600' : 'bg-red-600'
        } relative inline-flex h-8 w-32 items-center rounded-full`}
      >
        {checked ? (
          <span className="absolute left-1/2 transform -translate-x-1/2 text-white">
            {checkedValue}
          </span>
        ) : (
          <span className="absolute left-1/2 transform -translate-x-1/2 text-white">
            {uncheckedValue}
          </span>
        )}
        <span
          className={`${
            checked ? 'translate-x-[100px]' : 'translate-x-1'
          } inline-block h-6 w-6 transform rounded-full bg-white transition duration-300`}
        />
      </Switch>
    </div>
  );
};

export default StatusToggler;
