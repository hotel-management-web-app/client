import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { dehydrate, QueryClient } from 'react-query';
import Seo from '../components/Seo';
import Booking from '../components/Booking';
import Newsletter from '../components/Newsletter';
import Error from '../components/Error';
import HeroBg from '../public/images/hero-bg.png';
import { RoomType } from '../lib/types';
import { getRoomTypes } from '../lib/api/roomTypes';
import { useGetRoomTypes } from '../lib/operations/roomTypes';
import { routes } from '../utils/routes';
import { getAboutInfo } from '../lib/api/about';
import { useGetAboutInfo } from '../lib/operations/about';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], getRoomTypes);
  await queryClient.prefetchQuery(['aboutInfo'], getAboutInfo);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

interface HomeProps {
  roomTypes: RoomType[];
}

const Home: React.FC<HomeProps> = () => {
  const {
    data: roomTypes,
    isError: isRoomTypesError,
    error: roomTypesError,
  } = useGetRoomTypes();

  const {
    data: aboutInfo,
    isError: isAboutInfoError,
    error: aboutInfoError,
  } = useGetAboutInfo();

  if (isRoomTypesError) return <Error message={roomTypesError.message} />;
  if (isAboutInfoError) return <Error message={aboutInfoError.message} />;

  return (
    <div>
      <Seo title="Home Page" />
      <section id="hero" className="relative">
        <Image src={HeroBg} alt="hero background" layout="responsive" />
        <h1 className="absolute text-center top-1/3 left-1/2 transform -translate-x-1/2 text-white font-medium text-3xl w-full md:text-6xl md:leading-[80px]">
          Welcome to our Hotel
          <br />
          Please have a happy stay!
        </h1>
      </section>
      <div className="bg-dark-gray text-white -mt-2 py-16 px-8">
        <Booking />
      </div>
      <div className="container max-w-container mx-auto px-8 2xl:px-0">
        <section id="about-us" className="text-center">
          <h2 className="text-[2.5rem] font-light mt-20">About us</h2>
          <p className="font-light my-10 text-lg w-3/4 mx-auto leading-[30px]">
            {aboutInfo?.description}
          </p>
          <Link href={routes.about()}>
            <a className="underline text-3xl font-light">See more</a>
          </Link>
        </section>
        <section id="rooms" className="text-center">
          <h2 className="text-[2.5rem] font-light mt-40">See Our Rooms</h2>
          <div className="flex justify-around gap-y-10 2xl:justify-between flex-wrap mt-20 mb-16">
            {roomTypes?.slice(0, 3).map(({ id, name, image }) => (
              <Link key={id} href={routes.roomTypes(id!)}>
                <a className="relative">
                  <Image
                    src={image as string}
                    loader={() => image as string}
                    alt={name}
                    width="355"
                    height="473"
                  />
                  <p className="absolute text-white w-full text-3xl top-48 left-1/2 transform -translate-x-1/2">
                    {name}
                  </p>
                </a>
              </Link>
            ))}
          </div>
          <Link href={routes.rooms()}>
            <a className="underline text-3xl font-light">See all roms</a>
          </Link>
        </section>
        <section id="contact" className="text-center">
          <h2 className="text-[2.5rem] font-light mt-40">Contact Us</h2>
          <p className="font-light my-10 text-lg w-1/2 mx-auto leading-[30px]">
            If you have any problem please contact us here. We would be happy to
            answer your questions and solve your problems
          </p>
          <Link href={routes.contact()}>
            <a className="bg-dark-gray text-white text-2xl py-3 px-6">
              Contact page
            </a>
          </Link>
        </section>
      </div>
      <Newsletter />
    </div>
  );
};

export default Home;
