import React, { LegacyRef } from 'react';
import { DefaultInputComponentProps } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';

const PhoneNumberInput = (props: any) => (
  <div className="relative">
    <label htmlFor="phone-number">Phone number</label>
    <PhoneInput
      defaultCountry="PL"
      placeholder="Enter phone number"
      name="phoneNumber"
      inputComponent={Input}
      {...props}
    />
  </div>
);

export default PhoneNumberInput;

const Input = React.forwardRef(
  (
    props: DefaultInputComponentProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => (
    <input
      className="block border border-black mt-2 px-2 py-2 w-full focus:outline-none"
      placeholder="Phone number"
      name="phoneNumber"
      type="tel"
      ref={ref}
      onChange={props.onChange}
    />
  )
);
