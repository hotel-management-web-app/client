import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-tabs/style/react-tabs.css';
import {
  Header,
  BackButton,
  FormWrapper,
  SelectInput,
  Input,
  SubmitButton,
} from '../../../../components/Admin';
import RoomTypeSelector from '../../../../components/Admin/Form/RoomTypeSelector';
import StayDurationInput from '../../../../components/Admin/Form/StayDurationInput';
import Seo from '../../../../components/Seo';
import { getGuests } from '../../../../lib/api/guests';
import { getRoomTypes } from '../../../../lib/api/roomTypes';
import {
  useGetBooking,
  useUpdateBooking,
} from '../../../../lib/operations/bookings';
import { useGetGuests } from '../../../../lib/operations/guests';
import { useGetRoomTypes } from '../../../../lib/operations/roomTypes';
import { bookingSchema } from '../../../../lib/schemas';
import {
  RoomType,
  Guest,
  Room,
  Booking,
  ServerSideParams,
} from '../../../../lib/types';
import { getBooking } from '../../../../lib/api/bookings';
import ErrorMessage from '../../../../components/ErrorMessage';

const statusOptions: { value: string; label: string }[] = [
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'NOT_CONFIRMED', label: 'Not confirmed' },
];

interface EditBookingProps {
  roomTypes: RoomType[];
  guests: Guest[];
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as ServerSideParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], getRoomTypes);
  await queryClient.prefetchQuery(['guests'], getGuests);
  await queryClient.prefetchQuery(['bookings'], () => getBooking(Number(id)));

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const EditBooking: React.FC<EditBookingProps> = () => {
  const router = useRouter();
  const { id: bookingId } = router.query;
  const { data: roomTypes } = useGetRoomTypes();
  const { data: guests } = useGetGuests();
  const { data: booking } = useGetBooking(Number(bookingId));

  const [rooms, setRooms] = useState<Room[]>(
    booking?.room.roomType.rooms || []
  );

  const methods = useForm<Booking>({
    resolver: yupResolver(bookingSchema),
    mode: 'onChange',
  });

  const { handleSubmit } = methods;

  const { mutate, isLoading, isError, error } = useUpdateBooking(
    Number(bookingId)
  );

  const onSubmit: SubmitHandler<Booking> = (data) => {
    mutate(data);
  };

  const roomTypesOptions = roomTypes?.map((roomType) => ({
    value: roomType,
    label: roomType.name,
  }));

  const roomsOptions = rooms
    ?.filter(({ roomStatus }) => roomStatus !== 'RESERVED')
    .map(({ id, roomNumber }) => ({
      value: id,
      label: roomNumber,
    }));

  const guestsOptions = guests?.map(({ id, firstName, lastName }) => ({
    value: id!,
    label: `${firstName} ${lastName}`,
  }));

  return (
    <div>
      <div>
        <Seo title="Edit booking" />
        <div className="flex items-center flex-wrap gap-5">
          <Header title="Edit booking" />
          <BackButton name="bookings" url="/admin/bookings" />
        </div>
        <FormProvider {...methods}>
          {isError && <ErrorMessage errorMessage={error.message} />}
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl mt-5 mb-3">Details</h2>
            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-x-20 2xl:gap-x-40 gap-y-10">
              <SelectInput
                id="booking-status"
                title="Status"
                options={statusOptions}
                defaultOption={statusOptions.find(
                  (statusOption) => statusOption.value === booking?.status
                )}
              />
              <StayDurationInput
                defaultArrivalDate={booking?.arrivalDate}
                defaultDepartureDate={booking?.departureDate}
              />
              <RoomTypeSelector
                id="room-type"
                title="Room type"
                setRooms={setRooms}
                options={roomTypesOptions}
                defaultOption={roomTypesOptions?.find(
                  (roomTypeOption) =>
                    roomTypeOption.value.id === booking?.room.roomType.id
                )}
              />
              <SelectInput
                id="room-number"
                title="Room"
                keyName="roomId"
                options={roomsOptions}
                defaultOption={roomsOptions?.find(
                  (roomOption) => roomOption.value === booking?.roomId
                )}
              />
              <Input
                id="adults"
                title="Adults"
                type="number"
                min="1"
                max="5"
                defaultValue={booking?.adults}
              />
              <Input
                id="children"
                title="Children"
                type="number"
                min="0"
                max="5"
                defaultValue={booking?.children}
              />
              <SelectInput
                id="guest"
                title="Guest"
                keyName="guestId"
                options={guestsOptions}
                defaultOption={guestsOptions?.find(
                  (guestOption) => guestOption.value === booking?.guestId
                )}
              />
            </div>
            <div className="mt-5 flex justify-center">
              <SubmitButton name="Update booking" isLoading={isLoading} />
            </div>
          </FormWrapper>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditBooking;
