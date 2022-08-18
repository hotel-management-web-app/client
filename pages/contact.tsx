import Link from 'next/link';
import React from 'react';
import ContactForm from '../components/ContactForm';
import Seo from '../components/Seo';

const contact = () => (
  <div className="container max-w-[800px] mx-auto font-light mb-40 px-5">
    <Seo title="Contact" />
    <h1 className="text-4xl text-center mt-16">Contact</h1>
    <div className="flex items-end">
      <p className="mt-10">Email:</p>
      <Link href="mailto:info@aguasdeibiza.com">
        <a className="ml-3 underline">info@aguasdeibiza.com</a>
      </Link>
    </div>
    <div className="flex items-end">
      <p className="mt-2">Phone:</p>
      <Link href="tel:971-319-991">
        <a className="ml-3 underline">+34 971 31 99 91</a>
      </Link>
    </div>
    <ContactForm />
  </div>
);

export default contact;
