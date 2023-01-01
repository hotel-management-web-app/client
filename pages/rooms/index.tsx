import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '../../components/Seo';
import RoomsImg from '../../public/images/rooms.png';
import RoomImg from '../../public/images/room.png';
import { RoomType } from '../../lib/types';
import { getRoomTypes } from '../../lib/api/roomTypes';

export const getServerSideProps = async () => {
  const roomTypes = await getRoomTypes();

  return { props: { roomTypes } };
};

interface RoomsProps {
  roomTypes: RoomType[];
}

const Rooms: React.FC<RoomsProps> = ({ roomTypes }) => (
  <div>
    <Seo title="Rooms" />
    <div className="relative">
      <Image src={RoomsImg} alt="rooms" layout="responsive" />
      <h1 className="absolute text-center top-1/3 left-1/2 transform -translate-x-1/2 text-white font-medium text-3xl w-full md:text-5xl">
        Rooms & suites
      </h1>
    </div>
    <section id="rooms" className="container mx-auto max-w-container">
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 place-items-center gap-20 mt-28 mb-52">
        {roomTypes.map(({ id, name, description }) => (
          <div
            key={id}
            className="w-[430px] shadow-[0px_10px_30px_-10px_rgba(0,0,0,0.8)]"
          >
            <Image src={RoomImg} alt="room" />
            <div className="px-8 pt-5 pb-8">
              <h2 className="text-3xl font-medium">{name}</h2>
              <p className="my-4 font-light h-[120px] overflow-clip">
                {description}
              </p>
              <Link href={`/rooms/${id}`}>
                <a className="underline">More Details</a>
              </Link>
              <Link href="/room-booking">
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

export default Rooms;
