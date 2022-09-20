import React from 'react';
import Link from 'next/link';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

interface BackButtonProps {
  name: string;
  url: string;
}

const BackButton: React.FC<BackButtonProps> = ({ name, url }) => (
  <Link href={url}>
    <a className="text-gray-400">
      <BsFillArrowLeftCircleFill className="inline mb-1 mr-1" />
      Go back to &nbsp;
      {name}
    </a>
  </Link>
);

export default BackButton;
