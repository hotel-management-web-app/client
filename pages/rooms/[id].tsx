import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RoomBg from '../../public/images/room-details.png';
import Seo from '../../components/Seo';
import RoomImages from '../../components/RoomImages';

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
    name: 'Desk or Workplace',
  },
  {
    id: 4,
    name: 'Free Wi-Fi',
  },
  {
    id: 5,
    name: 'Bathtub',
  },
];

const details = [
  {
    id: 1,
    name: '34 - 40sqm (inc. terrace)',
  },
  {
    id: 1,
    name: 'Double bed',
  },
  {
    id: 1,
    name: 'Terrace',
  },
  {
    id: 1,
    name: 'Stunning ocean view',
  },
];

const Room = () => (
  <div>
    <Seo title="Room" />
    <Image src={RoomBg} alt="Standard double room" layout="responsive" />
    <div className="container mx-auto max-w-container mb-40 px-5 2xl:px-0">
      <h1 className="text-center text-4xl sm:text-5xl font-light mt-20">
        Standard double room
      </h1>
      <div className="flex flex-col 2xl:flex-row flex-wrap items-center 2xl:justify-between gap-10 2xl:items-start mt-20">
        <div className="bg-dark-gray w-full max-w-[750px] text-center 2xl:w-72 text-white px-12 py-9">
          <h2 className="text-2xl font-medium">Amenities</h2>
          <ul className="list-disc ml-5 mt-2 leading-[40px]">
            {amenities.map((amenity) => (
              <li key={amenity.id}>{amenity.name}</li>
            ))}
          </ul>
        </div>
        <p className="font-light max-w-[750px] text-xl text-center leading-[40px]">
          Our standard rooms (20m2 /215ft2) accommodate up to 2 guests, feature
          a king size bed, desk, single or double sink, shower and a 40&apos;
          Smart TV with city view. Complimentary WiFi, espresso, and tea. Our
          standard rooms play with masculine and feminine design elements to
          create a calm and welcoming atmosphere. A combination of decorative
          wallpaper and cement or brick are accented by locally handcrafted
          furniture and industrial-style windows. Our designers thoughtful
          details in each room foster a personalized experience making you feel
          at home.
        </p>
        <div className="bg-dark-gray text-center w-full max-w-[750px] 2xl:w-72 text-white px-12 py-9">
          <ul className="list-disc ml-5 mt-2 leading-[40px]">
            {details.map((detail) => (
              <li key={detail.id}>{detail.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center mt-24">
        <Link href="/rooms">
          <a className="bg-dark-gray text-white text-2xl py-6 px-16">
            Make a reservation
          </a>
        </Link>
      </div>
      <RoomImages />
    </div>
  </div>
);

export default Room;
