import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import Image from 'next/image';
import Link from 'next/link';
import Error from '../../components/Error';
import Seo from '../../components/Seo';
import RoomsImg from '../../public/images/rooms.png';
import { RoomType } from '../../lib/types';
import { getRoomTypes } from '../../lib/api/roomTypes';
import { useGetRoomTypes } from '../../lib/operations/roomTypes';
import { routes } from '../../utils/routes';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], () => getRoomTypes());

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

interface RoomsProps {
  roomTypes: RoomType[];
}

const Rooms: React.FC<RoomsProps> = () => {
  const { data: roomTypesData, isError, error } = useGetRoomTypes();

  const roomTypes = roomTypesData?.roomTypes;

  if (isError) return <Error message={error.message} />;

  return (
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
          {roomTypes?.map(({ id, name, description, image }) => (
            <div
              key={id}
              className="w-[400px] shadow-[0px_10px_30px_-10px_rgba(0,0,0,0.8)]"
            >
              <Image
                loader={() => image as string}
                src={image as string}
                width="400"
                height="300"
                alt="room"
              />
              <div className="px-8 pt-5 pb-8">
                <h2 className="text-2xl font-medium">{name}</h2>
                <p className="my-4 font-light h-[120px] overflow-clip">
                  {description}
                </p>
                <Link href={routes.rooms(id)}>
                  <a className="underline">More Details</a>
                </Link>
                <Link href={routes.roomBooking()}>
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
