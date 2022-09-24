import React from 'react';

interface InputProps {
  id: string;
  title: string;
  [restProps: string]: any;
}

const Input: React.FC<InputProps> = ({ id, title = 'Title', ...restProps }) => (
  <div>
    <label htmlFor={id} className="block mt-5">
      {title}
    </label>
    <input
      id={id}
      className="border border-px rounded-lg py-2 px-3 w-full focus:outline-none mt-1"
      placeholder={title}
      {...restProps}
    />
  </div>
);

export default Input;
