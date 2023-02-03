import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { Room, RoomType } from '../../lib/types';

const customStyles = {
  control: (provided: object) => ({
    ...provided,
    border: '1px solid #ccc',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #ccc',
    },
    marginTop: '4px',
  }),
};

interface RoomTypeSelectorOptions {
  value: RoomType;
  label: string;
}

interface RoomTypeSelectorProps {
  id: string;
  title: string;
  options?: RoomTypeSelectorOptions[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  defaultOption?: RoomTypeSelectorOptions;
}

const RoomTypeSelector: React.FC<RoomTypeSelectorProps> = ({
  id,
  title,
  options,
  setRooms,
  defaultOption = null,
}) => {
  const [selectedOption, setSelectedOption] =
    useState<RoomTypeSelectorOptions | null>(defaultOption);

  const onChange = (newOption: SingleValue<RoomTypeSelectorOptions>) => {
    setSelectedOption(newOption);
    setRooms(newOption?.value.rooms!);
  };

  return (
    <div className="relative">
      <label htmlFor={id}>{title}</label>
      <Select
        id={id}
        styles={customStyles}
        defaultValue={selectedOption}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export default RoomTypeSelector;
