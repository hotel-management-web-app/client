import Image from 'next/image';
import React from 'react';
import Header from '../../../../components/Admin/Header';
import Input from '../../../../components/Admin/Input';
import Textarea from '../../../../components/Admin/Textarea';
import Seo from '../../../../components/Seo';
import NoImage from '../../../../public/images/no_image.jpg';

const AddRoomType = () => (
  <div>
    <Seo title="Add Room Type" />
    <Header title="Add room type" />
    <form className="bg-white rounded-lg mt-5 px-10 pt-3 pb-7">
      <div className="w-[500px]">
        <Input id="room-type-name" title="Name" />
        <Textarea id="room-type-description" title="Description" rows="10" />
        <Input id="room-type-occupancy" title="Occupancy" />
        <Input id="room-type-price" title="Price" />
        <label htmlFor="room-image" className="mt-10 block">
          Room Image
        </label>
        <div className="flex items-center w-[1000px] mt-5 gap-10">
          <Image id="room-image" width="500" height="300" src={NoImage} />
          <input type="file" id="room-image-upload" className="hidden" />
          <label
            htmlFor="room-image-upload"
            className="bg-black text-white px-4 py-2 rounded-lg w-40 text-center cursor-pointer"
          >
            Upload image
          </label>
        </div>
      </div>
    </form>
  </div>
);

export default AddRoomType;
