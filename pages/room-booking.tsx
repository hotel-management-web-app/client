import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdArrowDropDown } from 'react-icons/md';
import { RiCupFill } from 'react-icons/ri';
import { AiFillCreditCard } from 'react-icons/ai';
import Seo from '../components/Seo';
import Booking from '../components/Booking';
import RoomImg from '../public/images/room-details.png';

const amenities = [
  {
    id: 1,
    name: 'Separate Shower',
  },
  {
    id: 2,
    name: 'Air Conditioning',
  },
  {
    id: 3,
    name: 'Desk of Workplace',
  },
  {
    id: 4,
    name: 'Free Wi-Fi',
  },
  {
    id: 5,
    name: 'Bathub',
  },
];

const RoomBooking = () => (
  <div className="container max-w-container mx-auto px-5 2xl:px-0">
    <Seo title="Room Booking" />
    <div className="mt-10">
      <Booking />
    </div>
    <div className="flex gap-20 xl:w-[1090px] mt-10 border border-black px-20 py-5">
      <div>
        <div className="flex">
          <p>View Results By</p>
          <MdArrowDropDown className="-mt-1" size="30" />
        </div>
        <p className="font-medium">Rooms</p>
      </div>
      <div>
        <div className="flex">
          <p>Sort By</p>
          <MdArrowDropDown className="-mt-1" size="30" />
        </div>
        <p className="font-medium">Recommended</p>
      </div>
    </div>
    <div className="border border-black mt-12 xl:w-[1090px] p-5 mb-20">
      <div className="flex flex-col xl:flex-row gap-5">
        <div className="w-full xl:w-[500px] xl:h-[166px] overflow-hidden">
          <Image
            src={RoomImg}
            width="500px"
            height="250px"
            layout="responsive"
          />
        </div>
        <div className="border-b-2 w-full pb-7">
          <p className="font-medium text-2xl">Premier Room</p>
          <p className="font-light mt-2">
            Romantic style room, offers a private terrace with mountain view.
            Spa access included
          </p>
          <div className="underline mt-5">Room Details</div>
        </div>
      </div>
      <div className="md:flex mt-8">
        <div className="md:w-[330px] xl:w-[500px] border-b-2 pb-7 md:border-b-0 md:border-r-2 px-5">
          <p className="text-3xl">Amenities</p>
          <ul className="font-light list-disc ml-5">
            {amenities.map(({ id, name }) => (
              <li key={id} className="mt-3">
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div className="pl-6 w-full font-light mt-10 md:mt-0">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <p className="font-medium text-2xl">Flexible Rage</p>
              <div className="flex gap-5 items-center font-medium mt-2">
                <RiCupFill size="20" />
                <p>Breakfast included</p>
              </div>
              <div className="flex gap-5 items-center font-medium mt-2">
                <AiFillCreditCard size="20" />
                <p>Guaranted with Credit Card</p>
              </div>
            </div>
            <div className="sm:text-right">
              <p className="text-2xl font-medium">$840</p>
              <p className="">Per Night</p>
              <p className="text-gray-500">Including Taxes & Fees</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-5 items-start mt-5">
            <p className="w-3/5">
              Rate includes breakfast, spa access and WiFi. Touristic Tax not
              included. Free cancellation up to 3 days before the day of
              arrival, subject to full penalty.
            </p>
            <Link href="/booking-form">
              <a className="bg-dark-gray text-white text-2xl py-3 px-6">
                Book Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RoomBooking;
