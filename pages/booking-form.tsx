import React from 'react';
import Seo from '../components/Seo';
import BookingFormInput from '../components/BookingFormInput';

const BookingForm = () => (
  <div className="container max-w-container mx-auto px-6 2xl:px-0">
    <Seo title="Booking Form" />
    <div className="flex justify-between flex-wrap my-12 items-start gap-10">
      <form className="border border-black px-12 py-8 w-[756px]">
        <h1 className="text-3xl text-center font-medium border-b-2 pb-7">
          Guest Information
        </h1>
        <div className="grid md:grid-cols-2 gap-x-24 gap-y-10 mt-6">
          <BookingFormInput id="first-name" title="First name" />
          <BookingFormInput id="last-name" title="Last name" />
          <BookingFormInput id="email" title="Email address" />
          <BookingFormInput id="phone-number" title="Phone number" />
        </div>
        <h2 className="text-xl font-medium border-b-2 pb-3 mt-10">
          Additional information
        </h2>
        <div className="grid md:grid-cols-2 gap-x-24 gap-y-10 mt-6">
          <BookingFormInput id="country" title="Country" />
          <BookingFormInput id="address" title="Address" />
          <BookingFormInput id="city" title="City" />
          <BookingFormInput id="postal-code" title="Postal Code" />
        </div>
        <h2 className="text-xl font-medium border-b-2 pb-3 mt-10 mb-6">
          Payment information
        </h2>
        <BookingFormInput id="card-number" title="Card Number" />
        <div className="grid md:grid-cols-2 gap-x-24 gap-y-10 mt-10">
          <BookingFormInput id="expiration" title="Expiration" />
          <BookingFormInput id="cvv" title="CVV" />
        </div>
        <div className="flex justify-center">
          <button className="bg-dark-gray text-white py-2 px-5 text-2xl mt-12 w-full md:w-auto">
            Make Reservation
          </button>
        </div>
      </form>
      <div className="w-[500px] border border-black px-12 pt-6 pb-12">
        <h1 className="text-3xl text-center font-medium border-b-2 pb-7">
          Your stay
        </h1>
        <div className="flex justify-between border-b-2 py-5">
          <div>
            <h2 className="text-2xl font-medium">Check-in</h2>
            <p className="mt-6">Sat, Jul 23, 2022</p>
          </div>
          <div>
            <h2 className="text-2xl font-medium">Check-out</h2>
            <p className="mt-6">Sun, Jul 24, 2022</p>
          </div>
        </div>
        <div className="py-5 border-b-2">
          <p>1 Adult</p>
        </div>
        <div className="py-5 border-b-2 flex justify-between">
          <div>
            <p className="text-2xl">Deluxe Room</p>
            <p className="mt-4">2 Nights</p>
          </div>
          <p className="text-2xl font-medium">$1,657.60</p>
        </div>
        <div className="mt-7 flex justify-between">
          <p className="text-3xl font-medium">Total:</p>
          <p className="text-3xl font-medium">$3,315.60</p>
        </div>
      </div>
    </div>
  </div>
);

export default BookingForm;
