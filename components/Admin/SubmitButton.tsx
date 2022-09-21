import React from 'react';
import { BsPlusLg } from 'react-icons/bs';

interface SubmitButtonProps {
  name: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ name }) => (
  <button className="bg-black text-white px-3 py-2 rounded-lg w-48">
    <BsPlusLg className="inline mb-1 mr-3" />
    {name}
  </button>
);

export default SubmitButton;
