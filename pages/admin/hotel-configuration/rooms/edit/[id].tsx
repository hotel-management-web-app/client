import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { dehydrate, QueryClient } from 'react-query';
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
import { useGetRoom, useUpdateRoom } from '../../../../../lib/operations/rooms';
import { Room, RoomType, SelectOption } from '../../../../../lib/types';
import { getRoomTypes } from '../../../../../lib/api/roomTypes';
import { getRoom } from '../../../../../lib/api/rooms';
import { roomSchema } from '../../../../../lib/schemas';
import { convertToOriginalForm } from '../../../../../utils/convertToOriginalForm';
import { roomStatuses } from '../../../../../constants/constants';
import ErrorMessage from '../../../../../components/ErrorMessage';
import Error from '../../../../../components/Error';
import { useGetRoomTypes } from '../../../../../lib/operations/roomTypes';

interface AddRoomProps {
  roomTypes: RoomType[];
  room: Room;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], getRoomTypes);
  await queryClient.prefetchQuery(['rooms'], () => getRoom(Number(id)));

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const EditRoom: React.FC<AddRoomProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const methods = useForm<Room>({
    resolver: yupResolver(roomSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const {
    data: roomTypes,
    isError: isRoomTypesError,
    error: roomTypesError,
  } = useGetRoomTypes();
  const {
    data: room,
    isError: isRoomError,
    error: roomError,
  } = useGetRoom(Number(id));
  const {
    mutate,
    isLoading,
    isError: isMutationError,
    error: mutationError,
  } = useUpdateRoom(Number(id));

  const onSubmit: SubmitHandler<Room> = (data) => {
    const convertedRoomStatus = convertToOriginalForm(
      roomStatuses,
      data.roomStatus
    );
    const updatedRoom = { ...data, roomStatus: convertedRoomStatus! };
    mutate(updatedRoom);
  };

  const roomTypesOptions: SelectOption[] | undefined = roomTypes?.map(
    ({ id: roomTypeId, name }) => ({
      value: roomTypeId!,
      label: name,
    })
  );

  if (isRoomTypesError) return <Error message={roomTypesError.message} />;
  if (isRoomError) return <Error message={roomError.message} />;

  return (
    <div>
      <Seo title="Edit Room" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Edit room" />
        <BackButton name="rooms" url="/admin/hotel-configuration/rooms/" />
      </div>
      <FormProvider {...methods}>
        {isMutationError && (
          <ErrorMessage errorMessage={mutationError.message} />
        )}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto w-11/12 lg:w-3/4 py-5">
            <div className="flex flex-col gap-5">
              <StatusToggler
                id="room-status"
                label="Room status"
                checkedValue="Reserved"
                uncheckedValue="Vacant"
                defaultStatus={room?.roomStatus === 'Reserved'}
              />
              <SelectInput
                id="room-type"
                title="Room type"
                keyName="roomTypeId"
                options={roomTypesOptions}
                defaultOption={roomTypesOptions?.find(
                  (roomTypeOption) => roomTypeOption.value === room?.roomTypeId
                )}
              />
              <Input
                id="room-floor-number"
                title="Floor number"
                type="number"
                min="0"
                defaultValue={room?.floorNumber}
              />
              <Input
                id="room-number"
                title="Room number"
                type="number"
                min="0"
                defaultValue={room?.roomNumber}
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
