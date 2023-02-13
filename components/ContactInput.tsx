import React from 'react';
import { useFormContext } from 'react-hook-form';

interface ContactInputProps {
  fieldName: string;
  textarea?: boolean;
  [props: string]: any;
}

const ContactInput: React.FC<ContactInputProps> = ({
  fieldName,
  textarea = false,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const input = React.createElement(
    textarea ? 'textarea' : 'input',
    {
      ...props,
      className: 'bg-[#EEE] px-3 py-3 w-full focus:outline-none',
      ...register(fieldName),
    },
    null
  );

  const error = errors[fieldName];

  return (
    <div className="relative mb-2">
      {input}
      {error && (
        <p className="absolute text-red-500">{error.message as string}</p>
      )}
    </div>
  );
};

export default ContactInput;
