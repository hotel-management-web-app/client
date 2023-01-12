import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Seo from '../../../../components/Seo';
import {
  Header,
  Input,
  Textarea,
  EditableList,
  ImageUploader,
  ImagesUploader,
  BackButton,
  SubmitButton,
  FormWrapper,
} from '../../../../components/Admin';
import { useAddRoomType } from '../../../../lib/operations/roomTypes';
import { RoomType } from '../../../../lib/types';
import { roomTypeSchema } from '../../../../lib/schemas';

const AddRoomType = () => {
  const methods = useForm<RoomType>({
    resolver: yupResolver(roomTypeSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useAddRoomType();

  const onSubmit: SubmitHandler<RoomType> = (data) => {
    const { name, description, occupancy, price, amenities, details } = data;
    mutate({ name, description, occupancy, price, amenities, details });
  };

  return (
    <div>
      <Seo title="Add Room Type" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Add room type" />
        <BackButton
          name="room types"
          url="/admin/hotel-configuration/room-types/"
        />
      </div>
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col 2xl:flex-row flex-wrap gap-20 mt-5">
            <div className="w-96 xl:w-[500px] flex flex-col gap-5">
              <Input id="name" title="Name" />
              <Textarea id="description" title="Description" rows="10" />
              <Input id="occupancy" title="Occupancy" type="number" min="0" />
              <Input id="price" title="Price" />
              <ImageUploader
                id="room-type-image"
                label="Room Image"
                width={500}
                height={300}
              />
              <div className="mt-10">
                <label>Room Gallery</label>
                <ImagesUploader />
              </div>
            </div>
            <div className="2xl:w-[400px] 2xl:mx-auto 2xl:ml-72">
              <div className="mb-10">
                <label>Amenities</label>
                <EditableList name="amenities" />
              </div>
              <div className="mb-10">
                <label className="mt-5">Details</label>
                <EditableList name="details" />
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <SubmitButton name="Add room type" isLoading={isLoading} />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default AddRoomType;
