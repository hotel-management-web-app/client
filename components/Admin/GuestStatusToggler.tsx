import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

const GuestStatusToggler = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div>
      <label htmlFor="status" className="block mb-1">
        Status
      </label>
      <Switch
        id="status"
        checked={checked}
        onChange={setChecked}
        className={`${
          checked ? 'bg-green-600' : 'bg-red-600'
        } relative inline-flex h-8 w-32 items-center rounded-full`}
      >
        {checked ? (
          <span className="absolute left-1/2 transform -translate-x-1/2 text-white">
            Active
          </span>
        ) : (
          <span className="absolute left-1/2 transform -translate-x-1/2 text-white">
            Inactive
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

export default GuestStatusToggler;
