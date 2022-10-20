import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { SelectOption } from '../../lib/types';
import camelize from '../../utils/camelize';

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

interface SelectInputProps {
  id: string;
  title: string;
  options: SelectOption[];
  defaultOption?: SelectOption;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  title,
  options,
  defaultOption = null,
}) => {
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    defaultOption
  );

  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const camelizedTitle = camelize(title);
  const error = errors[camelizedTitle];

  setValue(camelizedTitle, selectedOption?.label);

  return (
    <div className="relative">
      <label htmlFor={id}>{title}</label>
      <Select
        id={id}
        styles={customStyles}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      {error && (
        <p className="text-red-500 text-sm absolute">
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
