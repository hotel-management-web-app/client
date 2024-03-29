import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import moment from 'moment';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import { TailSpin } from 'react-loader-spinner';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Seo from '../../components/Seo';
import BookingFormInput from '../../components/BookingFormInput';
import { BookingFormInputs } from '../../lib/types';
import { bookingFormSchema } from '../../lib/schemas';
import { getRoomType } from '../../lib/api/roomTypes';
import { useGetRoomType } from '../../lib/operations/roomTypes';
import { countDaysBetweenDates } from '../../utils/countDaysBetweenDates';
import { usePayForStay } from '../../lib/operations/payment';
import { routes } from '../../utils/routes';
import ErrorMessage from '../../components/ErrorMessage';
import PhoneNumberInput from '../../components/PhoneNumberInput';

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
    mode: 'onBlur',
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const { mutate, isLoading, isError, error } = usePayForStay();

  const { adults, children, arrive, departure, room } = router.query;
  const canContinue = adults && children && arrive && departure && room;

  useEffect(() => {
    if (!canContinue) {
      router.push(routes.roomBooking());
    }
  }, [canContinue, router]);

  const { data: roomType } = useGetRoomType(Number(room));

  const numberOfNights = countDaysBetweenDates(
    new Date(arrive as string),
    new Date(departure as string)
  );

  const price: number = Number(Number(roomType?.price) / 100);

  const totalPrice = (numberOfNights * price).toFixed(2);

  const dateFormat = 'DD/MM/YYYY';
  const formattedArrivalDate = moment(arrive).format(dateFormat);
  const formattedDepartureDate = moment(departure).format(dateFormat);

  const onSubmit: SubmitHandler<BookingFormInputs> = (data) => {
    mutate({
      ...data,
      roomTypeId: Number(room),
      arrivalDate: arrive as string,
      departureDate: departure as string,
      adults: Number(adults),
      children: Number(children),
    });
  };

  return (
    <div className="container max-w-container mx-auto px-6 2xl:px-0">
      <Seo title="Booking Form" />
      <div className="flex justify-between flex-wrap my-12 items-start gap-10">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-black px-12 pt-8 pb-12 w-[756px] bg-[#F9F8F6]"
          >
            {isError && <ErrorMessage errorMessage={error.message} />}
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
              <div className="relative">
                <PhoneNumberInput control={control} />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm absolute">
                    {errors?.phoneNumber?.message as string}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-10">
              <BookingFormInput
                id="notes"
                isTextarea
                title="Additional Details and Preferences"
                fieldName="notes"
                rows="5"
              />
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
                {errors.privacyTerms && (
                  <p className="text-red-500 text-sm absolute mt-10">
                    {errors.privacyTerms.message as string}
                  </p>
                )}
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
                {errors.conditionsAndPolicies && (
                  <p className="text-red-500 text-sm absolute mt-10">
                    {errors.conditionsAndPolicies.message as string}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-dark-gray text-white py-2 px-12 text-2xl mt-12 w-full md:w-auto relative"
                disabled={isLoading}
              >
                {isLoading && (
                  <TailSpin
                    height="30"
                    width="30"
                    color="#ccc"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{
                      display: 'inline',
                      position: 'absolute',
                      left: '11px',
                    }}
                    visible
                  />
                )}
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
            <p className="text-2xl font-medium">${price.toFixed(2)}</p>
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
