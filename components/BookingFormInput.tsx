import React from 'react';

interface BookingFormInputProps {
  title: string;
}

const BookingFormInput: React.FC<BookingFormInputProps> = ({ title }) => (
  <div>
    <label htmlFor="first-name">{title}</label>
    <input
      id="first-name"
      placeholder={title}
      className="block border border-black mt-2 px-2 py-2 w-full focus:outline-none"
    />
  </div>
);

export default BookingFormInput;
