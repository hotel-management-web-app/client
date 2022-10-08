import React from 'react';
import { useFormContext } from 'react-hook-form';
import camelize from '../../utils/camelize';

interface TextareaProps {
  id: string;
  title: string;
  [restProps: string]: any;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  title = 'Title',
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
        placeholder={title}
        {...register(camelize(title))}
        {...restProps}
      />
    </div>
  );
};

export default Textarea;
