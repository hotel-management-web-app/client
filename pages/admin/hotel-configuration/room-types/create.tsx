import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import Header from '../../../../components/Admin/Header';
import Input from '../../../../components/Admin/Input';
import Textarea from '../../../../components/Admin/Textarea';
import Seo from '../../../../components/Seo';
import EditableList from '../../../../components/Admin/EditableList';
import ImageUploader from '../../../../components/Admin/ImageUploader';
import ImagesUploader from '../../../../components/Admin/ImagesUploader';
import BackButton from '../../../../components/Admin/BackButton';
import SubmitButton from '../../../../components/Admin/SubmitButton';
import FormWrapper from '../../../../components/Admin/FormWrapper';

interface Inputs {
  name: string;
  description: string;
  occupancy: number;
  price: string;
  roomImage: string;
  roomImages: string[];
}

const AddRoomType = () => {
  const methods = useForm<Inputs>();
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <FormProvider {...methods}>
      <Seo title="Add Room Type" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Add room type" />
        <BackButton
          name="room types"
          url="/admin/hotel-configuration/room-types/"
        />
      </div>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col 2xl:flex-row flex-wrap gap-20 mt-5">
          <div className="w-96 xl:w-[500px] flex flex-col gap-5">
            <Input id="room-type-name" title="Name" />
            <Textarea
              id="room-type-description"
              title="Description"
              rows="10"
            />
            <Input id="room-type-occupancy" title="Occupancy" />
            <Input id="room-type-price" title="Price" />
            <ImageUploader />
            <div>
              <h2 className="mt-10">Room Gallery</h2>
              <ImagesUploader />
            </div>
          </div>
          <div className="2xl:w-[400px] 2xl:mx-auto 2xl:ml-72">
            <div className="mb-10">
              <h2>Amenities</h2>
              <EditableList name="amenities" />
            </div>
            <div className="mb-10">
              <h2 className="mt-5">Details</h2>
              <EditableList name="details" />
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <SubmitButton name="Add room type" />
        </div>
      </FormWrapper>
    </FormProvider>
  );
};

export default AddRoomType;
