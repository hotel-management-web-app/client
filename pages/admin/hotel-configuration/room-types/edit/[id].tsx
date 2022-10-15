import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ParsedUrlQuery } from 'querystring';
import Seo from '../../../../../components/Seo';
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
} from '../../../../../components/Admin';
import { getRoomType } from '../../../../../lib/api/roomTypes';
import { useUpdateRoomType } from '../../../../../lib/operations/roomTypes';
import { RoomType } from '../../../../../lib/types';

interface ServerSideParams extends ParsedUrlQuery {
  id: string;
}

interface EditRoomTypeProps {
  roomTypeData: RoomType;
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as ServerSideParams;
  const data = await getRoomType(Number(id));

  return { props: { roomTypeData: data } };
};

const EditRoomType: React.FC<EditRoomTypeProps> = ({ roomTypeData }) => {
  const router = useRouter();
  const { id } = router.query;
  const methods = useForm<RoomType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useUpdateRoomType(Number(id));

  const onSubmit: SubmitHandler<RoomType> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <Seo title="Edit Room Type" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Edit room type" />
        <BackButton
          name="room types"
          url="/admin/hotel-configuration/room-types/"
        />
      </div>
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col 2xl:flex-row flex-wrap gap-20 mt-5">
            <div className="w-96 xl:w-[500px] flex flex-col gap-5">
              <Input id="name" title="Name" defaultValue={roomTypeData.name} />
              <Textarea
                id="description"
                title="Description"
                rows="10"
                defaultValue={roomTypeData.description}
              />
              <Input
                id="occupancy"
                title="Occupancy"
                type="number"
                min="0"
                defaultValue={roomTypeData.occupancy}
              />
              <Input
                id="price"
                title="Price"
                defaultValue={roomTypeData.price}
              />
              <ImageUploader />
              <div className="mt-10">
                <label>Room Gallery</label>
                <ImagesUploader />
              </div>
            </div>
            <div className="2xl:w-[400px] 2xl:mx-auto 2xl:ml-72">
              <div className="mb-10">
                <label>Amenities</label>
                <EditableList
                  name="amenities"
                  itemsProp={roomTypeData.amenities}
                />
              </div>
              <div className="mb-10">
                <label className="mt-5">Details</label>
                <EditableList name="details" itemsProp={roomTypeData.details} />
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <SubmitButton name="Update room type" isLoading={isLoading} />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default EditRoomType;
