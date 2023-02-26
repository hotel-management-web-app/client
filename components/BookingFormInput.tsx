import React from 'react';
import { useFormContext } from 'react-hook-form';

interface BookingFormInputProps {
  id: string;
  title: string;
  fieldName: string;
  isTextarea?: boolean;
  [restProps: string]: any;
}

const BookingFormInput: React.FC<BookingFormInputProps> = ({
  id,
  title,
  fieldName,
  isTextarea,
  ...restProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[fieldName];

  return (
    <div className="relative">
      <label htmlFor={id}>{title}</label>
      {isTextarea ? (
        <textarea
          id={id}
          placeholder={title}
          className="block border border-black mt-2 px-2 py-2 w-full focus:outline-none"
          {...register(fieldName)}
          {...restProps}
        />
      ) : (
        <input
          id={id}
          placeholder={title}
          className="block border border-black mt-2 px-2 py-2 w-full focus:outline-none"
          {...register(fieldName)}
          {...restProps}
        />
      )}
      {error && (
        <p className="text-red-500 text-sm absolute">
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default BookingFormInput;
