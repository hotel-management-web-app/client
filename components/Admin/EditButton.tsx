import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface EditButtonProps {
  id: number;
}

const EditButton: React.FC<EditButtonProps> = ({ id }) => {
  const router = useRouter();
  return (
    <Link href={`${router.pathname}/edit/${id}`}>
      <a className="bg-[#16D00B] text-white px-4 py-1 rounded-lg">Edit</a>
    </Link>
  );
};

export default EditButton;
