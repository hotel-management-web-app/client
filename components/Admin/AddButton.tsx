import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsPlusLg } from 'react-icons/bs';

interface AddButtonProps {
  title: string;
}

const AddButton: React.FC<AddButtonProps> = ({ title }) => {
  const router = useRouter();
  return (
    <Link href={`${router.pathname}/create`}>
      <a className="flex items-center gap-3 bg-black text-white px-4 rounded-lg text-lg py-2">
        <BsPlusLg />
        Add &nbsp;
        {title}
      </a>
    </Link>
  );
};

export default AddButton;
