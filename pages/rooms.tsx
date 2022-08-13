import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import RoomsImg from '../public/rooms.png';
import RoomImg from '../public/room.png';

const rooms = [
  {
    id: 1,
    name: 'Single room',
    description:
      'Spacious two bedroom villas, each with a full gourmet kitchen and expansive terrace. Many feature a private outdoor plunge pool.',
    imgUrl: '/../public/room.png',
    roomUrl: '/rooms/1',
  },
  {
    id: 2,
    name: 'Double room',
    description:
      'Spacious two bedroom villas, each with a full gourmet kitchen and expansive terrace. Many feature a private outdoor plunge pool. Spacious two bedroom villas, each with a full gourmet kitchen and expansive terrace. Many feature a private outdoor plunge pool.',
    imgUrl: '/../public/room.png',
    roomUrl: '/rooms/2',
  },
  {
    id: 3,
    name: 'Deluxe room',
    description:
      'Spacious two bedroom villas, each with a full gourmet kitchen and expansive terrace. Many feature a private outdoor plunge pool.',
    imgUrl: '/../public/room.png',
    roomUrl: '/rooms/3',
  },
];

const Rooms = () => {
  return (
    <div>
      <Head>
        <title>Rooms</title>
      </Head>
      <div className="relative">
        <Image src={RoomsImg} alt="rooms" layout="responsive" />
        <h1 className="absolute text-center top-1/3 left-1/2 transform -translate-x-1/2 text-white font-medium text-3xl w-full md:text-5xl">
          Rooms & suites
        </h1>
      </div>
      <section id="rooms" className="container mx-auto max-w-container">
        <div className="flex justify-center 2xl:justify-between gap-12 flex-wrap mt-28 mb-52">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="w-[430px] shadow-[0px_10px_30px_-10px_rgba(0,0,0,0.8)]"
            >
              <Image src={RoomImg} alt="room" />
              <div className="px-8 pt-5 pb-8">
                <h2 className="text-3xl font-medium">{room.name}</h2>
                <p className="my-4 font-light h-[120px] overflow-clip">
                  {room.description}
                </p>
                <Link href={room.roomUrl}>
                  <a className="underline">More Details</a>
                </Link>
                <Link href={room.roomUrl}>
                  <a className="bg-dark-gray text-white text-lg p-2 float-right mt-7 mb-8 ">
                    Book Now
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Rooms;
