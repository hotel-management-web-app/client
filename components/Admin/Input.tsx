import React from 'react';

interface InputProps {
  id: string;
  title: string;
  [restProps: string]: any;
}

const Input: React.FC<InputProps> = ({ id, title = 'Title', ...restProps }) => (
  <div>
    <label htmlFor={id} className="block">
      {title}
    </label>
    <input
      id={id}
      className="border border-[#ccc] border-px rounded py-2 px-3 w-full focus:outline-none mt-1 h-[36px]"
      placeholder={title}
      {...restProps}
    />
  </div>
);

export default Input;
