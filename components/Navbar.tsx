import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import SlideDown from 'react-slidedown';
import { useGetSettings } from '../lib/operations/generalSettings';
import { routes } from '../utils/routes';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Rooms', href: '/rooms' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const router = useRouter();
  const { data, isLoading } = useGetSettings();
  return (
    <Disclosure as="nav" className="bg-black py-2">
      {({ open }) => (
        <>
          <div className="max-w-[1500px] mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <IoMdClose className="text-white" />
                  ) : (
                    <GiHamburgerMenu className="text-white" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  {isLoading ? (
                    <p className="text-white">Loading logo...</p>
                  ) : (
                    <Link href="/">
                      <a className="text-white text-2xl font-bold flex items-center gap-2">
                        <Image
                          loader={() => data?.logo as string}
                          src={data?.logo as string}
                          width="50"
                          height="50"
                          alt="logo"
                        />
                        {data?.hotelName}
                      </a>
                    </Link>
                  )}
                </div>
                <div className="hidden sm:block sm:mx-auto">
                  <div className="flex space-x-4">
                    {navigation.map(({ name, href }) => (
                      <Link key={name} href={href}>
                        <a
                          className={classNames(
                            router.pathname === href
                              ? 'bg-gray-700 text-white'
                              : 'text-white hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-lg font-medium'
                          )}
                          aria-current={
                            router.pathname === href ? 'page' : undefined
                          }
                        >
                          {name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link href={routes.roomBooking()}>
                  <a className="text-white border border-white md:text-lg font-medium px-2 py-1 sm:px-5 text-sm">
                    Book Now
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="sm:hidden">
            <SlideDown>
              {open && (
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map(({ name, href }) => (
                    <Link key={name} href={href}>
                      <a
                        className={classNames(
                          router.pathname === href
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={
                          router.pathname === href ? 'page' : undefined
                        }
                      >
                        {name}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </SlideDown>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
