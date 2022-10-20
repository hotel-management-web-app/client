import React from 'react';
import { useFormContext } from 'react-hook-form';
import camelize from '../../utils/camelize';

interface InputProps {
  id: string;
  title: string;
  [restProps: string]: any;
}

const Input: React.FC<InputProps> = ({ id, title = 'Title', ...restProps }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const camelizedTitle = camelize(title);
  const error = errors[camelizedTitle];

  return (
    <div className="relative">
      <label htmlFor={id} className="block">
        {title}
      </label>
      <input
        id={id}
        className={`border ${
          error ? 'border-red-500' : 'border-[#ccc]'
        }   border-px rounded py-2 px-3 w-full focus:outline-none mt-1 h-[36px]`}
        placeholder={title}
        {...register(camelizedTitle)}
        {...restProps}
      />
      {error && (
        <p className="text-red-500 text-sm absolute">
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;
