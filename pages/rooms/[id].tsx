import React from 'react';
import Image from 'next/image';
import RoomBg from '../../public/room-details.png';
import { nanoid } from 'nanoid';

const amenities = [
  'Separate Shower',
  'Air Conditioning',
  'Desk or Workplace',
  'Free Wi-Fi',
  'Bathtub',
];

const details = [
  '34 - 40sqm (inc. terrace)',
  'Double bed',
  'Terrace',
  'Stunning ocean view',
];

const images = [
  '/../public/rooms.png',
  '/../public/home-room-1.png',
  '/../public/home-room-2.png',
  '/../public/home-room-3.png',
  '/../public/room-details.png',
  '/../public/room.png',
];

const Room = () => {
  return (
    <div>
      <Image src={RoomBg} alt="Standard double room" layout="responsive" />
      <div className="container mx-auto max-w-container mb-40">
        <h1 className="text-center text-5xl font-light mt-20">
          Standard double room
        </h1>
        <div className="flex justify-between gap-10 items-start mt-20">
          <div className="bg-dark-gray w-72 text-white px-12 py-9">
            <h2 className="text-2xl font-medium">Amenities</h2>
            <ul className="list-disc ml-5 mt-2 leading-[40px]">
              {amenities.map(amenity => (
                <li key={nanoid()}>{amenity}</li>
              ))}
            </ul>
          </div>
          <p className="font-light max-w-[750px] text-xl text-center leading-[40px]">
            Our standard rooms (20m2 /215ft2) accommodate up to 2 guests,
            feature a king size bed, desk, single or double sink, shower and a
            40&apos; Smart TV with city view. Complimentary WiFi, espresso, and
            tea. Our standard rooms play with masculine and feminine design
            elements to create a calm and welcoming atmosphere. A combination of
            decorative wallpaper and cement or brick are accented by locally
            handcrafted furniture and industrial-style windows. Our designers
            thoughtful details in each room foster a personalized experience
            making you feel at home.
          </p>
          <div className="bg-dark-gray w-72 text-white px-12 py-9">
            <ul className="list-disc ml-5 mt-2 leading-[40px]">
              {details.map(detail => (
                <li key={nanoid()}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-20 mt-40">
          {images.map(image => (
            <Image
              key={nanoid()}
              src={image}
              alt="room"
              width="450px"
              height="420px"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
