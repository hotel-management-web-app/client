import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import Seo from '../components/Seo';
import Booking from '../components/Booking';
import Error from '../components/Error';
import { getRoomTypes } from '../lib/api/roomTypes';
import { useGetRoomTypes } from '../lib/operations/roomTypes';
import { routes } from '../utils/routes';
import { RoomType } from '../lib/types';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['roomTypes'], getRoomTypes);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const RoomBooking = () => {
  const { data: roomTypes, isError, error } = useGetRoomTypes();
  const router = useRouter();
  const { children, adults, arrive, departure } = router.query;

  const filteredRoomTypes = roomTypes?.filter((roomType: RoomType) => {
    const { occupancy } = roomType;
    const personsCount = Number(adults) + Number(children);
    if (personsCount > occupancy) return false;

    // Room type will be available if at least one room is available
    // Room will be available if arrive and departure dates don't intersect with any of the bookings

    return roomType.rooms?.some((room) =>
      room.bookings?.every((booking) => {
        const { arrivalDate, departureDate } = booking;
        const bookingStartDate = new Date(arrivalDate);
        const bookingEndDate = new Date(departureDate);
        const startDate = new Date(arrive as string);
        const endDate = new Date(departure as string);

        // if there is an intersection
        if (
          (startDate >= bookingStartDate && startDate <= bookingEndDate) ||
          (endDate >= bookingStartDate && endDate <= bookingEndDate)
        ) {
          return false;
        }

        // if there is no intersection
        return true;
      })
    );
  });

  if (isError) return <Error message={error.message} />;

  return (
    <div className="container max-w-container mx-auto px-5 2xl:px-0">
      <Seo title="Room Booking" />
      <div className="mt-10">
        <Booking />
      </div>
      {children && adults && arrive && departure ? (
        <div>
          {filteredRoomTypes?.length !== 0 ? (
            <div>
              {filteredRoomTypes?.map((roomType) => (
                <div className="border border-black mt-12 xl:w-[1090px] p-5 mb-20">
                  <div className="flex flex-col xl:flex-row gap-5">
                    <div className="w-full xl:w-[400px] xl:h-[370px] overflow-hidden">
                      <Image
                        src={roomType.image as string}
                        loader={() => roomType.image as string}
                        width="500px"
                        height="500px"
                        layout="responsive"
                      />
                    </div>
                    <div className="xl:w-[690px]">
                      <div className="border-b-2 w-full pb-7">
                        <p className="font-medium text-2xl">{roomType.name}</p>
                        <p className="font-light mt-2 h-[100px] overflow-hidden">
                          {roomType.description}
                        </p>
                        <Link href={routes.roomTypes(roomType.id!)}>
                          <a className="underline mt-5">Room Details</a>
                        </Link>
                      </div>
                      <div className="md:flex mt-8">
                        <div className="w-full font-light mt-10 md:mt-0">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-3xl font-medium">
                                ${Number(roomType.price) / 100}
                              </p>
                              <p className="mt-16 w-[200px] lg:w-auto">
                                Free Cancellation if made no later than 3 day(s)
                                before arrival
                              </p>
                            </div>
                            <div className="sm:text-right">
                              <p>Per Night</p>
                              <p className="text-gray-500">
                                Including Taxes & Fees
                              </p>
                              <div className="flex flex-wrap justify-between gap-5 items-start mt-5">
                                <Link
                                  href={routes.bookingForm(
                                    adults as string,
                                    children as string,
                                    arrive as string,
                                    departure as string,
                                    roomType.id?.toString()!
                                  )}
                                >
                                  <a className="bg-dark-gray text-white text-2xl py-3 px-6">
                                    Book Now
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl mt-16 text-gray-500">
              There are no available rooms that match your requirements!
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-2xl mt-16 text-gray-500">
          Fill out the fields to search for available rooms!
        </p>
      )}
    </div>
  );
};

export default RoomBooking;
