/* eslint-disable dot-notation */
import React, { useState, useEffect } from 'react';
import { FocusedInputShape, DateRangePicker } from 'react-dates';
import moment from 'moment';
import { useFormContext } from 'react-hook-form';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

interface StayDurationInputProps {
  defaultArrivalDate?: Date;
  defaultDepartureDate?: Date;
}

const StayDurationInput: React.FC<StayDurationInputProps> = ({
  defaultArrivalDate,
  defaultDepartureDate = defaultArrivalDate,
}) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const [arrivalDateValue, setArrivalDateValue] =
    useState<moment.Moment | null>(moment(defaultArrivalDate) || null);
  const [departureDateValue, setDepartureDateValue] =
    useState<moment.Moment | null>(moment(defaultDepartureDate) || null);
  const [focusedInputValue, setFocusedInputValue] =
    useState<FocusedInputShape | null>(null);

  useEffect(() => {
    setValue('arrivalDate', arrivalDateValue?.toISOString());
  }, [arrivalDateValue, setValue]);

  useEffect(() => {
    setValue('departureDate', departureDateValue?.toISOString());
  }, [departureDateValue, setValue]);

  const arrivalDateError = errors['arrivalDate'];
  const departureDateError = errors['departureDate'];

  return (
    <div>
      <label htmlFor="dates" className="block mb-1">
        Arrival and departure dates
      </label>
      <DateRangePicker
        startDate={arrivalDateValue}
        startDateId="start-date"
        endDate={departureDateValue}
        endDateId="end-date"
        onDatesChange={({ startDate, endDate }) => {
          setArrivalDateValue(startDate);
          setDepartureDateValue(endDate);
        }}
        focusedInput={focusedInputValue}
        onFocusChange={(focusedInput) => setFocusedInputValue(focusedInput)}
        displayFormat="DD/MM/YYYY"
        enableOutsideDays={false}
      />
      {(arrivalDateError || departureDateError) && (
        <p className="text-red-500 text-sm absolute">
          Arrival and departure dates are required!
        </p>
      )}
    </div>
  );
};

export default StayDurationInput;
