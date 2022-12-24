import React, { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-tabs/style/react-tabs.css';
import BackButton from '../../../components/Admin/BackButton';
import FormWrapper from '../../../components/Admin/FormWrapper';
import Header from '../../../components/Admin/Header';
import Seo from '../../../components/Seo';
import SelectInput from '../../../components/Admin/SelectInput';
import Input from '../../../components/Admin/Input';
import SubmitButton from '../../../components/Admin/SubmitButton';
import RoomTypeSelector from '../../../components/Admin/RoomTypeSelector';
import StayDurationInput from '../../../components/Admin/StayDurationInput';
import { getRoomTypes } from '../../../lib/api/roomTypes';
import { Booking, Guest, Room, RoomType } from '../../../lib/types';
import { getGuests } from '../../../lib/api/guests';
import { useAddBooking } from '../../../lib/operations/bookings';
import { useGetRoomTypes } from '../../../lib/operations/roomTypes';
import { useGetGuests } from '../../../lib/operations/guests';
import { bookingSchema } from '../../../lib/schemas';

const statusOptions: { value: string; label: string }[] = [
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'NOT_CONFIRMED', label: 'Not confirmed' },
];

interface AddBookingProps {
  roomTypes: RoomType[];
  guests: Guest[];
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], getRoomTypes);
  await queryClient.prefetchQuery(['guests'], getGuests);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const AddBooking: React.FC<AddBookingProps> = () => {
  const { data: roomTypes } = useGetRoomTypes();
  const { data: guests } = useGetGuests();
  const [rooms, setRooms] = useState<Room[]>([]);
  const methods = useForm<Booking>({
    resolver: yupResolver(bookingSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useAddBooking();

  const onSubmit: SubmitHandler<Booking> = (data) => {
    mutate(data);
  };

  const roomTypesOptions = roomTypes?.map((roomType) => ({
    value: roomType,
    label: roomType.name,
  }));

  const roomsOptions = rooms?.map(({ id, roomNumber }) => ({
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
        <Seo title="Add booking" />
        <div className="flex items-center flex-wrap gap-5">
          <Header title="Add booking" />
          <BackButton name="bookings" url="/admin/bookings" />
        </div>
        <FormProvider {...methods}>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl mt-5 mb-3">Details</h2>
            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-x-20 2xl:gap-x-40 gap-y-10">
              <SelectInput
                id="booking-status"
                title="Status"
                options={statusOptions}
                defaultOption={statusOptions[0]}
              />
              <StayDurationInput />
              <RoomTypeSelector
                id="room-type"
                title="Room type"
                setRooms={setRooms}
                options={roomTypesOptions}
              />
              <SelectInput
                id="room-number"
                title="Room"
                keyName="roomId"
                options={roomsOptions}
              />
              <Input id="adults" title="Adults" type="number" min="1" max="5" />
              <Input
                id="children"
                title="Children"
                type="number"
                min="0"
                max="5"
              />
              <SelectInput
                id="guest"
                title="Guest"
                keyName="guestId"
                options={guestsOptions}
              />
            </div>
            <div className="mt-5 flex justify-center">
              <SubmitButton name="Add booking" isLoading={isLoading} />
            </div>
          </FormWrapper>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddBooking;
