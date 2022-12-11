import React, { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-tabs/style/react-tabs.css';
import BackButton from '../../../components/Admin/BackButton';
import FormWrapper from '../../../components/Admin/FormWrapper';
import Header from '../../../components/Admin/Header';
import Seo from '../../../components/Seo';
import SelectInput from '../../../components/Admin/SelectInput';
import Input from '../../../components/Admin/Input';
import Textarea from '../../../components/Admin/Textarea';
import SubmitButton from '../../../components/Admin/SubmitButton';
import StayDurationInput from '../../../components/Admin/StayDurationInput';
import { getRoomTypes } from '../../../lib/api/roomTypes';
import { Booking, Guest, Room, RoomType } from '../../../lib/types';
import { getGuests } from '../../../lib/api/guests';
import { useAddBooking } from '../../../lib/operations/bookings';
import RoomTypeSelector from '../../../components/Admin/RoomTypeSelector';
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
  const [isNewGuest, setIsNewGuest] = useState(false);
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
    value: id,
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
                min="1"
                max="5"
              />
            </div>
            <h2 className="text-2xl mt-10 mb-2">Guest Information</h2>
            <Tabs>
              <TabList>
                <Tab onClick={() => setIsNewGuest(false)}>Existing guest</Tab>
                <Tab onClick={() => setIsNewGuest(true)}>New guest</Tab>
              </TabList>
              <TabPanel>
                <div className="lg:w-2/3 mx-auto my-10">
                  <SelectInput
                    id="guest"
                    title="Guest"
                    keyName="guestId"
                    options={guestsOptions}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                {isNewGuest && (
                  <div className="grid lg:grid-cols-2 gap-x-20 gap-y-5 mt-5">
                    <Input id="first-name" title="First name" />
                    <Input id="last-name" title="Last name" />
                    <Input id="email-address" title="Email address" />
                    <Input id="phone-number" title="Phone number" />
                    <Textarea id="notes" title="Notes" rows="5" />
                  </div>
                )}
              </TabPanel>
            </Tabs>
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
