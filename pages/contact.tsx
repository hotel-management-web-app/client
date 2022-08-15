import React from 'react';
import ContactForm from '../components/ContactForm';

const contact = () => (
  <div className="container max-w-[800px] mx-auto font-light mb-40">
    <h1 className="text-4xl text-center mt-16">Contact</h1>
    <p className="mt-10">Email: info@aguasdeibiza.com</p>
    <p className="mt-2">Phone: +34 971 31 99 91</p>
    <ContactForm />
  </div>
);

export default contact;
