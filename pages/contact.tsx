import React from 'react';
import ContactForm from '../components/ContactForm';

const contact = () => (
  <div className="container max-w-[800px] mx-auto font-light mb-40 px-5">
    <h1 className="text-4xl text-center mt-16">Contact</h1>
    <div className="flex items-end">
      <p className="mt-10">Email:</p>
      <a href="mailto:info@aguasdeibiza.com" className="ml-3 underline">
        info@aguasdeibiza.com
      </a>
    </div>
    <div className="flex items-end">
      <p className="mt-2">Phone:</p>
      <a href="tel:971-319-991" className="ml-3 underline">
        +34 971 31 99 91
      </a>
    </div>
    <ContactForm />
  </div>
);

export default contact;
