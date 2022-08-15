/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '../components/Seo';
import Booking from '../components/Booking';
import Newsletter from '../components/Newsletter';
import HeroBg from '../public/images/hero-bg.png';

const rooms = [
  {
    id: 1,
    name: 'Ordinary Room',
    imgUrl: '/../public/images/home-room-1.png',
    href: '#',
  },
  {
    id: 2,
    name: 'Deluxe Room',
    imgUrl: '/../public/images/home-room-2.png',
    href: '#',
  },
  {
    id: 3,
    name: 'Outside Room',
    imgUrl: '/../public/images/home-room-3.png',
    href: '#',
  },
];

const Home: NextPage = () => (
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
    <Booking />
    <div className="container max-w-container mx-auto px-8 2xl:px-0">
      <section id="rooms" className="text-center">
        <h2 className="text-[2.5rem] font-light mt-20">See Our Rooms</h2>
        <div className="flex justify-around gap-y-10 2xl:justify-between flex-wrap mt-20 mb-16">
          {rooms.map((room) => (
            <a key={room.id} href={room.href} className="relative">
              <Image
                src={room.imgUrl}
                alt={room.name}
                width="355"
                height="473"
              />
              <p className="absolute text-white w-full text-3xl top-48 left-1/2 transform -translate-x-1/2">
                {room.name}
              </p>
            </a>
          ))}
        </div>
        <Link href="/rooms">
          <a className="underline text-3xl font-light">See all roms</a>
        </Link>
      </section>
    </div>
    <Newsletter />
  </div>
);

export default Home;
