import React from 'react';
import { BsPlusLg } from 'react-icons/bs';

interface SubmitButtonProps {
  name: string;
  addIcon?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  name,
  addIcon = false,
}) => (
  <button className="bg-black text-white px-3 py-2 rounded-lg w-48">
    {addIcon && <BsPlusLg className="inline mb-1 mr-3" />}
    {name}
  </button>
);

export default SubmitButton;
