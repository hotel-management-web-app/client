import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Seo from '../../../../components/Seo';
import camelize from '../../../../utils/camelize';
import {
  BackButton,
  Header,
  SubmitButton,
  FormWrapper,
  Input,
  SelectInput,
  StatusToggler,
} from '../../../../components/Admin';
import { useAddRoom } from '../../../../lib/operations/rooms';
import { Room, RoomType, SelectOption } from '../../../../lib/types';
import { getRoomTypes } from '../../../../lib/api/roomTypes';
import { roomSchema } from '../../../../lib/schemas';

interface AddRoomProps {
  roomTypes: RoomType[];
}

export const getServerSideProps = async () => {
  const roomTypes = await getRoomTypes();

  return { props: { roomTypes } };
};

const AddRoom: React.FC<AddRoomProps> = ({ roomTypes }) => {
  const methods = useForm<Room>({
    resolver: yupResolver(roomSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useAddRoom();

  const onSubmit: SubmitHandler<Room> = (data) => {
    mutate(data);
  };

  const roomTypesOptions: SelectOption[] = roomTypes.map((roomType) => ({
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
