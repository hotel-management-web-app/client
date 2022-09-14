import React, { useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
// eslint-disable-next-line object-curly-newline
import { FaCalendarAlt, FaUsers, FaBroom, FaBars } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import Deadpool from '../public/images/deadpool.png';
import NavbarSubitem from './NavbarSubitem';

const iconSize = 25;

const links: {
  id: number;
  name: string;
  route: string;
  icon: React.ReactNode;
  sublinks?: { id: number; name: string; route: string }[];
}[] = [
  {
    id: 1,
    name: 'Dashboard',
    route: 'dashboard',
    icon: <AiFillDashboard size={iconSize} className="mr-4" />,
  },
  {
    id: 2,
    name: 'Bookings',
    route: 'bookings',
    icon: <FaCalendarAlt size={iconSize} className="mr-4" />,
  },
  {
    id: 3,
    name: 'Guests',
    route: 'guests',
    icon: <FaUsers size={iconSize} className="mr-4" />,
  },
  {
    id: 4,
    name: 'Hotel Configuration',
    route: 'hotel-configuration',
    icon: <BsFillGearFill size={iconSize} className="mr-4" />,
    sublinks: [
      {
        id: 1,
        name: 'Logo',
        route: 'logo',
      },
      {
        id: 1,
        name: 'Room Types',
        route: 'room-types',
      },
      {
        id: 1,
        name: 'Rooms',
        route: 'rooms',
      },
    ],
  },
  {
    id: 1,
    name: 'Housekeeping',
    route: 'housekeeping',
    icon: <FaBroom size={iconSize} className="mr-4" />,
  },
];

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div>
        <button onClick={() => setIsOpen(!isOpen)}>
          <FaBars size="25" />
        </button>
        <div
          className="relative z-40 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <CSSTransition
            in={isOpen}
            timeout={500}
            unmountOnExit
            classNames={{
              enter: 'opacity-0',
              enterActive: 'opacity-100 transition duration-500',
              exit: 'opacity-100',
              exitActive: 'opacity-0 transition duration-500',
            }}
          >
            <button
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              aria-label="save"
              onClick={() => setIsOpen(!isOpen)}
            />
          </CSSTransition>
          <CSSTransition
            in={isOpen}
            timeout={500}
            unmountOnExit
            classNames={{
              enter: 'transform -translate-x-full',
              enterActive: 'transform translate-x-0 transition duration-500',
              exit: 'transform translate-x-0',
              exitActive: 'transform -translate-x-full transition duration-500',
            }}
          >
            <div className="fixed top-0 h-full w-[280px] flex z-40">
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-[#171820]">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <i className="fa-solid fa-x text-white" />
                  </button>
                </div>
                <div className="mt-5 flex-1 text-white h-0 overflow-y-auto">
                  <div className="flex gap-5 font-medium px-5">
                    <Image src={Deadpool} width="60" height="60" />
                    <div>
                      <p>Deadpool</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="bg-green-500 w-2 h-2 rounded" />
                        <p className="text-sm">Admin</p>
                      </div>
                    </div>
                  </div>
                  <nav className="space-y-3 mt-5">
                    {links.map((link) => {
                      if (link.sublinks) {
                        return (
                          <NavbarSubitem
                            icon={link.icon}
                            name={link.name}
                            route={link.route}
                            sublinks={link.sublinks}
                          />
                        );
                      }
                      return (
                        <Link key={link.id} href={link.route}>
                          <a className="hover:bg-gray-700 group flex items-center px-5 py-2 text-base font-medium rounded-md">
                            {link.icon}
                            {link.name}
                          </a>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-[#171820] overflow-y-auto text-white">
          <div className="mt-12 flex-1 flex flex-col">
            <div className="flex gap-5 font-medium px-5">
              <Image src={Deadpool} width="60" height="60" />
              <div>
                <p>Deadpool</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="bg-green-500 w-2 h-2 rounded" />
                  <p className="text-sm">Admin</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 pb-4 mt-5 space-y-3">
              {links.map((link) => {
                if (link.sublinks) {
                  return (
                    <NavbarSubitem
                      icon={link.icon}
                      name={link.name}
                      route={link.route}
                      sublinks={link.sublinks}
                    />
                  );
                }

                return (
                  <Link key={link.id} href={`/admin/${link.route}`}>
                    <a className="hover:bg-gray-700 group flex items-center px-5 py-2 font-medium rounded-md">
                      {link.icon}
                      {link.name}
                    </a>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
