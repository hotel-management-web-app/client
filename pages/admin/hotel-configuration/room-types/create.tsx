import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';
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

interface AddRoomTypeInputs {
  name: string;
  description: string;
  occupancy: number;
  price: string;
  roomImage: string;
  roomImages: string[];
}

const schema = yup.object({
  name: yup.string().required('Name is required!'),
  description: yup.string(),
  occupancy: yup
    .number()
    .typeError('Occupancy must be a number!')
    .positive()
    .integer('Occupancy must be an integer!')
    .required('Occupancy is required!'),
  price: yup
    .number()
    .typeError('Price must be a number!')
    .positive()
    .required('Price is required!'),
  roomImage: yup.string(),
  roomImages: yup.array(),
});

const AddRoomType = () => {
  const methods = useForm<AddRoomTypeInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useMutation<Response, Error, AddRoomTypeInputs>(
    (roomType) => axios.post('/room-types', roomType)
  );

  const onSubmit: SubmitHandler<AddRoomTypeInputs> = (data) => {
    mutate(data);
  };

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
            <Input id="name" title="Name" />
            <Textarea id="description" title="Description" rows="10" />
            <Input id="occupancy" title="Occupancy" type="number" min="0" />
            <Input id="price" title="Price" />
            <ImageUploader />
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
          <SubmitButton
            name={`${isLoading ? 'Loading...' : 'Add room type'}`}
          />
        </div>
      </FormWrapper>
    </FormProvider>
  );
};

export default AddRoomType;
