import React from 'react';

interface DeleteButtonProps {
  deleteHandler: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ deleteHandler }) => (
  <button
    className="bg-[#FC3532] text-white px-4 py-1 rounded-lg ml-4"
    onClick={deleteHandler}
  >
    Delete
  </button>
);

export default DeleteButton;
