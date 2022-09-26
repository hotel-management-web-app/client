import React from 'react';

interface TextareaProps {
  id: string;
  title: string;
  [restProps: string]: any;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  title = 'Title',
  ...restProps
}) => (
  <div>
    <label htmlFor={id} className="block">
      {title}
    </label>
    <textarea
      id={id}
      className="border border-px rounded-lg py-2 px-3 w-full focus:outline-none mt-1"
      placeholder={title}
      {...restProps}
    />
  </div>
);

export default Textarea;
