import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  BackButton,
  Header,
  SubmitButton,
  FormWrapper,
  Input,
  SelectInput,
  StatusToggler,
} from '../../../../../components/Admin';
import Seo from '../../../../../components/Seo';
import { useUpdateRoom } from '../../../../../lib/operations/rooms';
import {
  Room,
  RoomType,
  SelectOption,
  ServerSideParams,
} from '../../../../../lib/types';
import { getRoomTypes } from '../../../../../lib/api/roomTypes';
import { getRoom } from '../../../../../lib/api/rooms';
import { roomSchema } from '../../../../../lib/schemas';
import { convertRoomStatus } from '../../../../../utils/convertRoomStatus';

interface AddRoomProps {
  roomTypes: RoomType[];
  room: Room;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const roomTypes = await getRoomTypes();
  const { id } = params as ServerSideParams;
  const room = await getRoom(Number(id));

  return { props: { roomTypes, room } };
};

const EditRoom: React.FC<AddRoomProps> = ({ roomTypes, room }) => {
  const router = useRouter();
  const { id } = router.query;
  const methods = useForm<Room>({
    resolver: yupResolver(roomSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useUpdateRoom(Number(id));

  const onSubmit: SubmitHandler<Room> = (data) => {
    const convertedRoomStatus = convertRoomStatus(data.roomStatus);
    const updatedRoom = { ...data, roomStatus: convertedRoomStatus! };
    mutate(updatedRoom);
  };

  const roomTypesOptions: SelectOption[] = roomTypes.map(
    ({ id: roomTypeId, name }) => ({
      value: roomTypeId,
      label: name,
    })
  );

  return (
    <div>
      <Seo title="Edit Room" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Edit room" />
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
                defaultStatus={room.roomStatus === 'Reserved'}
              />
              <SelectInput
                id="room-type"
                title="Room type"
                keyName="roomTypeId"
                options={roomTypesOptions}
                defaultOption={roomTypesOptions.find(
                  (roomTypeOption) => roomTypeOption.value === room.roomTypeId
                )}
              />
              <Input
                id="room-floor-number"
                title="Floor number"
                type="number"
                min="0"
                defaultValue={room.floorNumber}
              />
              <Input
                id="room-number"
                title="Room number"
                type="number"
                min="0"
                defaultValue={room.roomNumber}
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <SubmitButton name="Update room" isLoading={isLoading} />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default EditRoom;
