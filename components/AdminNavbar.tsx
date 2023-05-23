import React, { useEffect, useState } from 'react';
import { AiFillDashboard, AiOutlineBars } from 'react-icons/ai';
import { IoMdExit } from 'react-icons/io';
import { FaUsers, FaBroom, FaBars, FaUserAlt } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';
import { IoCalendar } from 'react-icons/io5';
import { TbReport } from 'react-icons/tb';
import { RiAdminFill } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import Deadpool from '../public/images/admin.jpg';
import NavbarSubitems from './NavbarSubitems';
import { useLogout } from '../lib/operations/auth';
import { LinkProps } from '../lib/types';
import { routes } from '../utils/routes';
import { useGetProfileInfo } from '../lib/operations/profile';

const iconSize = 25;

const links: LinkProps[] = [
  {
    name: 'Dashboard',
    route: 'dashboard',
    icon: <AiFillDashboard size={iconSize} className="mr-4" />,
  },
  {
    name: 'Availability Calendar',
    route: 'availability-calendar',
    icon: <IoCalendar size={iconSize} className="mr-4" />,
  },
  {
    name: 'Bookings',
    route: 'bookings',
    icon: <AiOutlineBars size={iconSize} className="mr-4" />,
  },
  {
    name: 'Guests',
    route: 'guests',
    icon: <FaUsers size={iconSize} className="mr-4" />,
  },
  {
    name: 'Hotel Configuration',
    route: 'hotel-configuration',
    icon: <BsFillGearFill size={iconSize} className="mr-4" />,
    sublinks: [
      {
        name: 'General settings',
        route: 'general-settings',
      },
      {
        name: 'Room Types',
        route: 'room-types',
      },
      {
        name: 'Rooms',
        route: 'rooms',
      },
      {
        name: 'About settings',
        route: 'about-settings',
      },
    ],
  },
  {
    name: 'Housekeeping',
    route: 'housekeeping',
    icon: <FaBroom size={iconSize} className="mr-4" />,
  },
  {
    name: 'Reports',
    route: 'reports',
    icon: <TbReport size={iconSize} className="mr-4" />,
  },
];

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);

  const { data: user } = useGetProfileInfo();
  const { mutate } = useLogout();

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <div>
      <div className="absolute top-3 right-7">
        <div className="flex gap-10 text-gray-500">
          <Link href={routes.profile()}>
            <a className="flex items-center gap-1">
              <FaUserAlt size="14" />
              Profile
            </a>
          </Link>
          <button className="flex items-center gap-1" onClick={() => mutate()}>
            <IoMdExit />
            Logout
          </button>
        </div>
      </div>
      <div>
        <button className="mt-2 ml-2" onClick={() => setIsOpen(!isOpen)}>
          <FaBars size="25" />
        </button>
        <div
          className="relative z-40 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <CSSTransition
            in={isOpen}
            timeout={300}
            unmountOnExit
            classNames={{
              enter: 'opacity-0',
              enterActive: 'opacity-100 transition duration-300',
              exit: 'opacity-100',
              exitActive: 'opacity-0 transition duration-300',
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
            timeout={300}
            unmountOnExit
            classNames={{
              enter: 'transform -translate-x-full',
              enterActive: 'transform translate-x-0 transition duration-300',
              exit: 'transform translate-x-0',
              exitActive: 'transform -translate-x-full transition duration-300',
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
                    <Image
                      src={Deadpool}
                      width="60"
                      height="60"
                      className="rounded-full"
                    />
                    <div>
                      <p>{user?.name}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="bg-green-500 w-2 h-2 rounded" />
                        <p className="text-sm">Online</p>
                      </div>
                    </div>
                  </div>
                  <nav className="space-y-3 mt-5">
                    {links.map(({ name, icon, route, sublinks }) => {
                      if (sublinks) {
                        return (
                          <NavbarSubitems
                            key={name}
                            icon={icon}
                            name={name}
                            route={route}
                            sublinks={sublinks}
                          />
                        );
                      }
                      return (
                        <Link key={name} href={routes.admin(route)}>
                          <a className="hover:bg-gray-700 group flex items-center px-5 py-2 text-base font-medium rounded-md">
                            {icon}
                            {name}
                          </a>
                        </Link>
                      );
                    })}
                    {role === 'SUPERADMIN' && (
                      <Link key="Users" href="users">
                        <a className="hover:bg-gray-700 group flex items-center px-5 py-2 text-base font-medium rounded-md">
                          <RiAdminFill size={iconSize} className="mr-4" />
                          Users
                        </a>
                      </Link>
                    )}
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
              <Image
                src={Deadpool}
                width="60"
                height="60"
                className="rounded-full"
              />
              <div>
                <p>{user?.name}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="bg-green-500 w-2 h-2 rounded" />
                  <p className="text-sm">Online</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 pb-4 mt-5 space-y-3">
              {links.map((link) => {
                if (link.sublinks) {
                  return (
                    <NavbarSubitems
                      key={link.name}
                      icon={link.icon}
                      name={link.name}
                      route={link.route}
                      sublinks={link.sublinks}
                    />
                  );
                }

                return (
                  <Link key={link.name} href={routes.admin(link.route)}>
                    <a className="hover:bg-gray-700 group flex items-center px-5 py-2 font-medium rounded-md">
                      {link.icon}
                      {link.name}
                    </a>
                  </Link>
                );
              })}
              {role === 'SUPERADMIN' && (
                <Link key="Users" href={routes.admin('users')}>
                  <a className="hover:bg-gray-700 group flex items-center px-5 py-2 font-medium rounded-md">
                    <RiAdminFill size={iconSize} className="mr-4" />
                    Users
                  </a>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
