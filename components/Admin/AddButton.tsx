import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsPlusLg } from 'react-icons/bs';

interface AddButtonProps {
  name: string;
}

const AddButton: React.FC<AddButtonProps> = ({ name }) => {
  const router = useRouter();
  return (
    <Link href={`${router.pathname}/create`}>
      <a className="flex items-center gap-3 bg-black text-white px-4 rounded-lg text-lg py-2">
        <BsPlusLg />
        Add &nbsp;
        {name}
      </a>
    </Link>
  );
};

export default AddButton;
