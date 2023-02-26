import React from 'react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '../../components/Seo';
import RoomImages from '../../components/RoomImages';
import { RoomType } from '../../lib/types';
import { getRoomType } from '../../lib/api/roomTypes';
import { useGetRoomType } from '../../lib/operations/roomTypes';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], () => getRoomType(Number(id)));

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

interface RoomProps {
  roomType: RoomType;
}

const Room: React.FC<RoomProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: roomType } = useGetRoomType(Number(id));

  return (
    <div>
      <Seo title="Room" />
      <Image
        loader={() => roomType?.image as string}
        src={roomType?.image as string}
        layout="responsive"
        width="1920"
        height="650"
        alt="Standard double room"
      />
      <div className="container mx-auto max-w-container mb-40 px-5 2xl:px-0">
        <h1 className="text-center text-4xl sm:text-5xl font-light mt-20">
          {roomType?.name}
        </h1>
        <div className="flex flex-col 2xl:flex-row flex-wrap items-center 2xl:justify-between gap-10 2xl:items-start mt-20">
          <div className="bg-dark-gray w-full max-w-[750px] text-center 2xl:w-72 text-white px-12 py-9">
            <h2 className="text-2xl font-medium">Amenities</h2>
            <ul className="list-disc ml-5 mt-2 leading-[40px]">
              {roomType?.amenities.map((amenity) => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
          </div>
          <p className="font-light max-w-[750px] text-xl text-center leading-[40px]">
            {roomType?.description}
          </p>
          <div className="bg-dark-gray text-center w-full max-w-[750px] 2xl:w-72 text-white px-12 py-9">
            <ul className="list-disc ml-5 mt-2 leading-[40px]">
              {roomType?.details.map((detail) => (
                <li key={detail}>{detail}</li>
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
        <RoomImages images={roomType?.images as string[]} />
      </div>
    </div>
  );
};

export default Room;
