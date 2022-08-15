import React from 'react';

const Newsletter = () => (
  <section
    id="newsletter"
    className="text-center bg-dark-gray text-white mt-40 pt-12 pb-20 px-8 2xl:px-0"
  >
    <h2 className="text-4xl font-medium">Stay up to date</h2>
    <h3 className="text-3xl mt-8">Subscribe to our newsletter</h3>
    <form
      action="#"
      className="flex justify-around gap-y-10 gap-x-8 2xl:justify-between flex-wrap max-w-container mx-auto mt-24 text-black"
    >
      <input placeholder="Name" className="w-96 h-16 pl-5" />
      <input placeholder="Email Address" className="w-96 h-16 pl-5" />
      <button className="w-96 h-16 bg-yellow-500 font-medium text-lg text-white">
        Subscribe
      </button>
    </form>
  </section>
);

export default Newsletter;
