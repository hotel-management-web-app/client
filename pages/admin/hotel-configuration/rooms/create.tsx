import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { dehydrate, QueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import Seo from '../../../../components/Seo';
import {
  BackButton,
  Header,
  SubmitButton,
  FormWrapper,
  Input,
  SelectInput,
  StatusToggler,
} from '../../../../components/Admin';
import Error from '../../../../components/Error';
import { useAddRoom } from '../../../../lib/operations/rooms';
import { Room, SelectOption } from '../../../../lib/types';
import { getRoomTypes } from '../../../../lib/api/roomTypes';
import { roomSchema } from '../../../../lib/schemas';
import { convertToOriginalForm } from '../../../../utils/convertToOriginalForm';
import { roomStatuses } from '../../../../constants/constants';
import ErrorMessage from '../../../../components/ErrorMessage';
import { useGetRoomTypes } from '../../../../lib/operations/roomTypes';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], () => getRoomTypes());

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const AddRoom: React.FC = () => {
  const methods = useForm<Room>({
    resolver: yupResolver(roomSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const {
    data: roomTypesData,
    isError: isRoomTypesError,
    error: roomTypesError,
  } = useGetRoomTypes();

  const roomTypes = roomTypesData?.roomTypes;

  const { mutate, isLoading, isError, error } = useAddRoom();

  const onSubmit: SubmitHandler<Room> = (data) => {
    const convertedRoomStatus = convertToOriginalForm(
      roomStatuses,
      data.roomStatus
    );
    const room = { ...data, roomStatus: convertedRoomStatus! };
    mutate(room);
  };

  const roomTypesOptions: SelectOption[] | undefined = roomTypes?.map(
    ({ id, name }) => ({
      value: id!,
      label: name,
    })
  );

  if (isRoomTypesError) return <Error message={roomTypesError.message} />;

  return (
    <div>
      <Seo title="Add Room" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Add room" />
        <BackButton name="rooms" url="/admin/hotel-configuration/rooms/" />
      </div>
      <FormProvider {...methods}>
        {isError && <ErrorMessage errorMessage={error.message} />}
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
                keyName="roomTypeId"
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
