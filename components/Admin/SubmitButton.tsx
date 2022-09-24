import React from 'react';

interface SubmitButtonProps {
  name: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ name }) => (
  <button className="bg-black text-white px-3 py-2 rounded-lg w-48">
    {name}
  </button>
);

export default SubmitButton;
