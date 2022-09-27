import React, { useState } from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided: object) => ({
    ...provided,
    border: '1px solid #ccc',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #ccc',
    },
  }),
};

interface SelectInputProps {
  id: string;
  title: string;
  options: { value: string; label: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({ id, title, options }) => {
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <Select
        id={id}
        styles={customStyles}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
};

export default SelectInput;
