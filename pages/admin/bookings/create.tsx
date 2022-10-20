import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
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
import { getRooms } from '../../../lib/api/rooms';
import { Booking, Guest, Room, RoomType } from '../../../lib/types';
import camelize from '../../../utils/camelize';
import { getGuests } from '../../../lib/api/guests';

const statusOptions: { value: string; label: string }[] = [
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'pending', label: 'Pending' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'not confirmed', label: 'Not confirmed' },
];

const paymantMethodOptions = [
  { value: 'bank-account', label: 'Bank account' },
  { value: 'cash', label: 'Cash' },
];

interface AddBookingProps {
  roomTypes: RoomType[];
  rooms: Room[];
  guests: Guest[];
}

export const getServerSideProps = async () => {
  const roomTypes = await getRoomTypes();
  const rooms = await getRooms();
  const guests = await getGuests();

  return { props: { roomTypes, rooms, guests } };
};

const AddBooking: React.FC<AddBookingProps> = ({
  roomTypes,
  rooms,
  guests,
}) => {
  const [isNewGuest, setIsNewGuest] = useState(false);
  const methods = useForm<Booking>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<Booking> = (data) => {
    console.log(data);
  };

  const roomTypesOptions = roomTypes.map((roomType) => ({
    value: camelize(roomType.name),
    label: roomType.name,
  }));

  const roomsOptions = rooms.map((room) => ({
    value: room.roomNumber,
    label: room.roomNumber,
  }));

  const guestsOptions = guests.map((guest) => ({
    value: camelize(`${guest.firstName} ${guest.lastName}`),
    label: `${guest.firstName} ${guest.lastName}`,
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
              <SelectInput
                id="payment-method"
                title="Payment method"
                options={paymantMethodOptions}
                defaultOption={paymantMethodOptions[0]}
              />
              <SelectInput
                id="room-type"
                title="Room type"
                options={roomTypesOptions}
              />
              <SelectInput
                id="room-number"
                title="Room"
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
                    <Input id="country" title="Country" />
                    <Input id="address" title="Address" />
                    <Input id="city" title="City" />
                    <Input id="postal-code" title="Postal Code" />
                    <Textarea id="notes" title="Notes" rows="5" />
                  </div>
                )}
              </TabPanel>
            </Tabs>
            <div className="mt-5 flex justify-center">
              <SubmitButton name="Add booking" />
            </div>
          </FormWrapper>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddBooking;
