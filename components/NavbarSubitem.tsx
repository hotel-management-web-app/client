import React, { useState } from 'react';
import Link from 'next/link';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import { BsRecordCircle } from 'react-icons/bs';
import { HiChevronLeft } from 'react-icons/hi';

interface NavbarSubitemProps {
  icon: React.ReactNode;
  name: string;
  route: string;
  sublinks: {
    id: number;
    name: string;
    route: string;
  }[];
}

const NavbarSubitem: React.FC<NavbarSubitemProps> = ({
  icon,
  name,
  route,
  sublinks,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  return (
    <div>
      <button
        className="hover:bg-gray-700 group flex items-center justify-between w-full px-5 py-2 font-medium rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex text-left">
          {icon}
          {name}
        </div>
        <HiChevronLeft
          size="25"
          className={`transition duration-[400ms] transform ${
            isOpen && '-rotate-90'
          }`}
        />
      </button>
      <SlideDown className="my-dropdown-slidedown">
        {isOpen && (
          <div className="bg-gray-800">
            {sublinks.map((sublink) => (
              <Link key={sublink.id} href={`/admin/${route}/${sublink.route}`}>
                <a className="hover:bg-gray-700 group flex items-center px-2 py-2 font-medium rounded-md">
                  <BsRecordCircle size="20" className="mx-4" />
                  {sublink.name}
                </a>
              </Link>
            ))}
          </div>
        )}
      </SlideDown>
    </div>
  );
};

export default NavbarSubitem;
