import React from 'react';
import ContactInput from './ContactInput';

const ContactForm = () => (
  <form action="#" className="flex flex-col gap-5 mt-10">
    <div className="grid grid-cols-2 gap-5">
      <ContactInput placeholder="First Name" />
      <ContactInput placeholder="Second Name" />
      <ContactInput placeholder="Email" />
      <ContactInput placeholder="Phone" />
    </div>
    <ContactInput placeholder="Subject" />
    <ContactInput placeholder="Message" textarea rows={8} />
  </form>
);

export default ContactForm;
