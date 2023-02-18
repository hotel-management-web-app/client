import React from 'react';
import { GetServerSideProps } from 'next';
import moment from 'moment';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Seo from '../components/Seo';
import BookingFormInput from '../components/BookingFormInput';
import { BookingFormInputs } from '../lib/types';
import { bookingFormSchema } from '../lib/schemas';
import { getRoomType } from '../lib/api/roomTypes';
import { useGetRoomType } from '../lib/operations/roomTypes';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { room } = query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], () =>
    getRoomType(Number(room))
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const BookingForm = () => {
  const router = useRouter();
  const methods = useForm<BookingFormInputs>({
    resolver: yupResolver(bookingFormSchema),
    mode: 'onChange',
  });
  const { register, handleSubmit } = methods;

  const { adults, children, arrive, departure, room } = router.query;

  const { data: roomType } = useGetRoomType(Number(room));

  const numberOfNights = Math.ceil(
    (new Date(departure as string).getTime() -
      new Date(arrive as string).getTime()) /
      (60 * 60 * 24 * 1000)
  );

  const price = roomType?.price;

  const totalPrice = (numberOfNights * Number(price)).toFixed(2);

  const dateFormat = 'DD/MM/YYYY';
  const formattedArrivalDate = moment(arrive).format(dateFormat);
  const formattedDepartureDate = moment(departure).format(dateFormat);

  const onSubmit: SubmitHandler<BookingFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="container max-w-container mx-auto px-6 2xl:px-0">
      <Seo title="Booking Form" />
      <div className="flex justify-between flex-wrap my-12 items-start gap-10">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border  border-black px-12 pt-8 pb-12 w-[756px] bg-[#F9F8F6]"
          >
            <h1 className="text-3xl text-center font-medium border-b-2 pb-7">
              Guest Information
            </h1>
            <div className="grid md:grid-cols-2 gap-x-24 gap-y-10 mt-6">
              <BookingFormInput
                id="first-name"
                title="First name"
                fieldName="firstName"
              />
              <BookingFormInput
                id="last-name"
                title="Last name"
                fieldName="lastName"
              />
              <BookingFormInput
                id="email"
                title="Email address"
                fieldName="email"
              />
              <BookingFormInput
                id="phone-number"
                title="Phone number"
                fieldName="phoneNumber"
              />
            </div>
            <h2 className="text-xl font-medium border-b-2 pb-3 mt-10 mb-6">
              Payment information
            </h2>
            <BookingFormInput
              id="card-number"
              title="Card Number"
              fieldName="cardNumber"
            />
            <div className="grid md:grid-cols-2 gap-x-24 gap-y-10 mt-10">
              <BookingFormInput
                id="expiration"
                title="Expiration"
                fieldName="expiration"
              />
              <BookingFormInput id="cvv" title="CVV" fieldName="cvv" />
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="flex items-center">
                <input
                  id="privacy-terms"
                  type="checkbox"
                  className="w-6 h-6 bg-white"
                  {...register('privacyTerms')}
                />
                <label
                  htmlFor="privacy-terms"
                  className="ml-4 text-lg text-gray-900 dark:text-gray-300"
                >
                  I agree with the
                  <a href="#" className=" ml-1 font-light underline">
                    Privacy Terms
                  </a>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="booking-conditions"
                  type="checkbox"
                  className="w-6 h-6 bg-white"
                  {...register('conditionsAndPolicies')}
                />
                <label
                  htmlFor="booking-conditions"
                  className="ml-4 text-lg text-gray-900 dark:text-gray-300"
                >
                  I agree with the
                  <a href="#" className=" ml-1 font-light underline">
                    Booking Conditions and Policies
                  </a>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-dark-gray text-white py-2 px-5 text-2xl mt-12 w-full md:w-auto">
                Make Reservation
              </button>
            </div>
          </form>
        </FormProvider>
        <div className="w-[500px] border border-black px-12 pt-6 pb-12 bg-[#F9F8F6]">
          <h1 className="text-3xl text-center font-medium border-b-2 pb-7">
            Your stay
          </h1>
          <div className="flex justify-between border-b-2 py-5">
            <div>
              <h2 className="text-2xl font-medium">Check-in</h2>
              <p className="mt-6">{formattedArrivalDate}</p>
            </div>
            <div>
              <h2 className="text-2xl font-medium">Check-out</h2>
              <p className="mt-6">{formattedDepartureDate}</p>
            </div>
          </div>
          <div className="flex py-5 border-b-2">
            {Number(adults) > 0 && (
              <p>{Number(adults) === 1 ? '1 Adult' : `${adults} adults`}</p>
            )}
            {Number(children) > 0 && (
              <p>
                {Number(children) === 1
                  ? ', 1 Child'
                  : `, ${children}  children`}
              </p>
            )}
          </div>
          <div className="py-5 border-b-2 flex justify-between">
            <div>
              <p className="text-2xl">Deluxe Room</p>
              <p className="mt-4">{numberOfNights} Nights</p>
            </div>
            <p className="text-2xl font-medium">$ {roomType?.price}</p>
          </div>
          <div className="mt-7 flex justify-between">
            <p className="text-3xl font-medium">Total:</p>
            <p className="text-3xl font-medium">${totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
