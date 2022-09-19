import React from 'react';
import Image from 'next/image';
import Header from '../../../../components/Admin/Header';
import Input from '../../../../components/Admin/Input';
import Textarea from '../../../../components/Admin/Textarea';
import Seo from '../../../../components/Seo';
import NoImage from '../../../../public/images/no_image.jpg';
import EditableList from '../../../../components/Admin/EditableList';
import ImageUploader from '../../../../components/Admin/ImageUploader';

const AddRoomType = () => (
  <form onSubmit={() => console.log('submit')}>
    <Seo title="Add Room Type" />
    <div className="flex justify-between items-center w-full">
      <Header title="Add room type" />
      <button className="bg-black text-white px-4 py-2 rounded-lg w-40">
        Add room type
      </button>
    </div>
    <div className="bg-white rounded-lg mt-10 px-10 pt-3 pb-7">
      <div className="flex flex-wrap gap-20">
        <div className="w-96 xl:w-[500px]">
          <Input id="room-type-name" title="Name" />
          <Textarea id="room-type-description" title="Description" rows="10" />
          <Input id="room-type-occupancy" title="Occupancy" />
          <Input id="room-type-price" title="Price" />
          <label htmlFor="room-image" className="mt-10 block">
            Room Image
          </label>
          <div className="flex flex-wrap items-center w-96 xl:w-[1000px] mt-5 gap-10">
            <Image id="room-image" width="500" height="300" src={NoImage} />
            <input
              type="file"
              id="room-image-upload"
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="room-image-upload"
              className="bg-black text-white px-4 py-2 rounded-lg w-40 text-center cursor-pointer"
            >
              Upload image
            </label>
          </div>
          <h2 className="mt-10">Room Gallery</h2>
          <ImageUploader />
        </div>
        <div className="lg:w-[400px] 2xl:mx-auto 2xl:ml-72">
          <div className="mb-10">
            <h2 className="mt-5">Amenites</h2>
            <EditableList />
          </div>
          <div className="mb-10">
            <h2 className="mt-5">Details</h2>
            <EditableList />
          </div>
        </div>
      </div>
    </div>
  </form>
);

export default AddRoomType;
