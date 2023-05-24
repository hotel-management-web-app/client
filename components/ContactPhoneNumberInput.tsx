import React, { LegacyRef } from 'react';
import { DefaultInputComponentProps } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';

const ContactPhoneNumberInput = (props: any) => (
  <PhoneInput
    defaultCountry="PL"
    placeholder="Enter phone number"
    name="phoneNumber"
    inputComponent={Input}
    {...props}
  />
);

export default ContactPhoneNumberInput;

const Input = React.forwardRef(
  (
    props: DefaultInputComponentProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => (
    <input
      className="bg-[#EEE] px-3 py-3 w-full focus:outline-none"
      placeholder="Phone number"
      name="phoneNumber"
      type="tel"
      ref={ref}
      onChange={props.onChange}
    />
  )
);
