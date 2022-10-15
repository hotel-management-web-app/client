import React from 'react';
import axios from 'axios';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Seo from '../../../../components/Seo';
import BackButton from '../../../../components/Admin/BackButton';
import Header from '../../../../components/Admin/Header';
import SubmitButton from '../../../../components/Admin/SubmitButton';
import FormWrapper from '../../../../components/Admin/FormWrapper';
import Input from '../../../../components/Admin/Input';
import SelectInput from '../../../../components/Admin/SelectInput';
import camelize from '../../../../utils/camelize';
import StatusToggler from '../../../../components/Admin/StatusToggler';
import { useAddRoom } from '../../../../lib/operations/rooms';
import { Room, RoomType } from '../../../../lib/types';

const schema = yup.object({
  roomStatus: yup.string(),
  roomType: yup.string().required(),
  floorNumber: yup
    .number()
    .typeError('Floor number must be a number')
    .required(),
  roomNumber: yup.number().typeError('Room number must be a number').required(),
});

interface AddRoomProps {
  roomTypes: RoomType[];
}

export const getServerSideProps = async () => {
  const roomTypes = await axios.get('/room-types').then((res) => res.data);

  return { props: { roomTypes } };
};

const AddRoom: React.FC<AddRoomProps> = ({ roomTypes }) => {
  const methods = useForm<Room>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useAddRoom();

  const onSubmit: SubmitHandler<Room> = (data) => {
    mutate(data);
  };

  const roomTypesOptions = roomTypes.map((roomType) => ({
    value: camelize(roomType.name),
    label: roomType.name,
  }));

  return (
    <div>
      <Seo title="Add Room" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Add room" />
        <BackButton name="rooms" url="/admin/hotel-configuration/rooms/" />
      </div>
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto w-11/12 lg:w-3/4 py-5">
            <div className="flex flex-col gap-5">
              <StatusToggler
                id="room-status"
                label="Room status"
                checkedValue="Reserved"
                uncheckedValue="Vacant"
              />
              <SelectInput
                id="room-type"
                title="Room type"
                options={roomTypesOptions}
              />
              <Input
                id="room-floor-number"
                title="Floor number"
                type="number"
                min="0"
              />
              <Input
                id="room-number"
                title="Room number"
                type="number"
                min="0"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <SubmitButton name="Add room" isLoading={isLoading} />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default AddRoom;
