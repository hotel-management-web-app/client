import React from 'react';

interface ContactInputProps {
  textarea?: boolean;
  [props: string]: any;
}

const ContactInput: React.FC<ContactInputProps> = ({
  textarea = false,
  ...props
}) =>
  React.createElement(
    textarea ? 'textarea' : 'input',
    { ...props, className: 'bg-[#EEE] px-3 py-3 w-full focus:outline-none' },
    null
  );

export default ContactInput;
