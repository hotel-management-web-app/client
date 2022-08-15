/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const DatePicker = () => {
  const [startDateValue, setStartDateValue] = useState<moment.Moment | null>(
    null
  );
  const [endDateValue, setEndDateValue] = useState<moment.Moment | null>(null);
  const [focusedInputValue, setFocusedInputValue] =
    useState<FocusedInputShape | null>(null);
  return (
    <div className="relative mt-10">
      <label htmlFor="start-date" className="absolute -top-[44px]">
        Check-in
      </label>
      <label htmlFor="end-date" className="absolute -top-[44px] left-40">
        Check-out
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
        onFocusChange={(focusedInput) => setFocusedInputValue(focusedInput)}
        displayFormat="DD/MM/YYYY"
        enableOutsideDays={false}
      />
    </div>
  );
};

export default DatePicker;
