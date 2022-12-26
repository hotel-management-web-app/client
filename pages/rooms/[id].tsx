import React from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import RoomBg from '../../public/images/room-details.png';
import Seo from '../../components/Seo';
import RoomImages from '../../components/RoomImages';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const roomType = await axios.get(`/room-types/${id}`).then((res) => res.data);

  return { props: { roomType } };
};

interface RoomProps {
  roomType: {
    id: number;
    name: string;
    description: string;
    roomUrl: string;
    amenities: {
      id: number;
      name: string;
    }[];
    details: {
      id: number;
      name: string;
    }[];
  };
}

const Room: React.FC<RoomProps> = ({ roomType }) => (
  <div>
    <Seo title="Room" />
    <Image src={RoomBg} alt="Standard double room" layout="responsive" />
    <div className="container mx-auto max-w-container mb-40 px-5 2xl:px-0">
      <h1 className="text-center text-4xl sm:text-5xl font-light mt-20">
        {roomType.name}
      </h1>
      <div className="flex flex-col 2xl:flex-row flex-wrap items-center 2xl:justify-between gap-10 2xl:items-start mt-20">
        <div className="bg-dark-gray w-full max-w-[750px] text-center 2xl:w-72 text-white px-12 py-9">
          <h2 className="text-2xl font-medium">Amenities</h2>
          <ul className="list-disc ml-5 mt-2 leading-[40px]">
            {roomType.amenities.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
        <p className="font-light max-w-[750px] text-xl text-center leading-[40px]">
          {roomType.description}
        </p>
        <div className="bg-dark-gray text-center w-full max-w-[750px] 2xl:w-72 text-white px-12 py-9">
          <ul className="list-disc ml-5 mt-2 leading-[40px]">
            {roomType.details.map((detail) => (
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
