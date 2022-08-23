import React from 'react';

interface BookingFormInputProps {
  id: string;
  title: string;
}

const BookingFormInput: React.FC<BookingFormInputProps> = ({ id, title }) => (
  <div>
    <label htmlFor={id}>{title}</label>
    <input
      id={id}
      placeholder={title}
      className="block border border-black mt-2 px-2 py-2 w-full focus:outline-none"
    />
  </div>
);

export default BookingFormInput;
