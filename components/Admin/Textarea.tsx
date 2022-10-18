import React from 'react';
import { useFormContext } from 'react-hook-form';
import camelize from '../../utils/camelize';

interface TextareaProps {
  id: string;
  title: string;
  placeholder?: string;
  fieldName?: string;
  [restProps: string]: any;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  title = 'Title',
  placeholder = title,
  fieldName = camelize(title),
  ...restProps
}) => {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className="block">
        {title}
      </label>
      <textarea
        id={id}
        className="border border-[#ccc] border-px rounded-lg py-2 px-3 w-full focus:outline-none mt-1"
        placeholder={placeholder}
        {...register(fieldName)}
        {...restProps}
      />
    </div>
  );
};

export default Textarea;
