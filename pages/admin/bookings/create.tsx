import React, { useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BackButton from '../../../components/Admin/BackButton';
import FormWrapper from '../../../components/Admin/FormWrapper';
import Header from '../../../components/Admin/Header';
import Seo from '../../../components/Seo';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import SelectInput from '../../../components/Admin/SelectInput';
import Input from '../../../components/Admin/Input';
import Textarea from '../../../components/Admin/Textarea';
import SubmitButton from '../../../components/Admin/SubmitButton';

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

const roomTypeOptions = [
  { value: 'apartment', label: 'Apartament' },
  { value: 'double-room', label: 'Double room' },
  { value: 'family-room', label: 'Family room' },
  { value: 'single-room', label: 'Single room' },
];

const roomOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const guestOptions = [
  { value: 'darth-vader', label: 'Darth Vader' },
  { value: 'palpatine', label: 'Palpatine' },
  { value: 'thrawn', label: 'Thrawn' },
];

const AddBooking = () => {
  const [startDateValue, setStartDateValue] = useState<moment.Moment | null>(
    null
  );
  const [endDateValue, setEndDateValue] = useState<moment.Moment | null>(null);
  const [focusedInputValue, setFocusedInputValue] =
    useState<FocusedInputShape | null>(null);
  return (
    <div>
      <form>
        <Seo title="Add booking" />
        <div className="flex items-center flex-wrap gap-5">
          <Header title="Add booking" />
          <BackButton name="bookings" url="/admin/bookings" />
        </div>
        <FormWrapper>
          <h2 className="text-2xl mt-5 mb-3">Details</h2>
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-x-20 2xl:gap-x-40 gap-y-10">
            <SelectInput
              id="booking-status"
              title="Status"
              options={statusOptions}
            />
            <div>
              <label htmlFor="dates" className="block mb-1">
                Arrival and departure dates
              </label>
              <DateRangePicker
                startDate={startDateValue}
                startDateId="start-date"
                endDate={endDateValue}
                endDateId="end-date"
                onDatesChange={({ startDate, endDate }) => {
                  setStartDateValue(startDate);
                  setEndDateValue(endDate);
                }}
                focusedInput={focusedInputValue}
                onFocusChange={(focusedInput) =>
                  setFocusedInputValue(focusedInput)
                }
                displayFormat="DD/MM/YYYY"
                enableOutsideDays={false}
              />
            </div>
            <SelectInput
              id="payment-method"
              title="Payment method"
              options={paymantMethodOptions}
            />
            <SelectInput
              id="room-type"
              title="Room type"
              options={roomTypeOptions}
            />
            <SelectInput id="room-number" title="Room" options={roomOptions} />
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
              <Tab>Existing guest</Tab>
              <Tab>New guest</Tab>
            </TabList>
            <TabPanel>
              <div className="w-2/3 mx-auto my-10">
                <SelectInput id="guest" title="Guest" options={guestOptions} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid lg:grid-cols-2 gap-x-20 gap-y-5 mt-5">
                <Input id="first-name" title="First name" />
                <Input id="first-name" title="Last name" />
                <Input id="first-name" title="Email addres" />
                <Input id="first-name" title="Phone number" />
                <Input id="first-name" title="Country" />
                <Input id="first-name" title="Address" />
                <Input id="first-name" title="City" />
                <Input id="first-name" title="Postal Code" />
                <Textarea id="notes" title="Notes" rows="5" />
              </div>
            </TabPanel>
          </Tabs>
          <div className="mt-5 flex justify-center">
            <SubmitButton name="Add booking" />
          </div>
        </FormWrapper>
      </form>
    </div>
  );
};

export default AddBooking;
