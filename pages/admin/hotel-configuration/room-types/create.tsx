import React from 'react';
import Image from 'next/image';
import Header from '../../../../components/Admin/Header';
import Input from '../../../../components/Admin/Input';
import Textarea from '../../../../components/Admin/Textarea';
import Seo from '../../../../components/Seo';
import NoImage from '../../../../public/images/no_image.jpg';
import EditableList from '../../../../components/Admin/EditableList';
import ImageUploader from '../../../../components/Admin/ImageUploader';
import BackButton from '../../../../components/Admin/BackButton';
import SubmitButton from '../../../../components/Admin/SubmitButton';
import FormWrapper from '../../../../components/Admin/FormWrapper';

const AddRoomType = () => (
  <div>
    <Seo title="Add Room Type" />
    <div className="flex items-center flex-wrap gap-5">
      <Header title="Add room type" />
      <BackButton
        name="room types"
        url="/admin/hotel-configuration/room-types/"
      />
    </div>
    <FormWrapper>
      <div className="flex flex-col 2xl:flex-row flex-wrap gap-20 mt-5">
        <div className="w-96 xl:w-[500px] flex flex-col gap-5">
          <Input id="room-type-name" title="Name" />
          <Textarea id="room-type-description" title="Description" rows="10" />
          <Input id="room-type-occupancy" title="Occupancy" />
          <Input id="room-type-price" title="Price" />
          <div>
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
          </div>
          <div>
            <h2 className="mt-10">Room Gallery</h2>
            <ImageUploader />
          </div>
        </div>
        <div className="2xl:w-[400px] 2xl:mx-auto 2xl:ml-72">
          <div className="mb-10">
            <h2>Amenities</h2>
            <EditableList />
          </div>
          <div className="mb-10">
            <h2 className="mt-5">Details</h2>
            <EditableList />
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <SubmitButton name="Add room type" />
      </div>
    </FormWrapper>
  </div>
);

export default AddRoomType;
