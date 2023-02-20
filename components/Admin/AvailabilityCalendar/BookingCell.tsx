import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { Booking } from '../../../lib/types';
import { countDaysBetweenDates } from '../../../utils/countDaysBetweenDates';
import { routes } from '../../../utils/routes';

interface BookingProps {
  booking: Booking;
  cellWidth: number;
}

const BookingCell: React.FC<BookingProps> = ({ booking, cellWidth }) => {
  const bgColor = () => {
    const h =
      (new Date(booking.arrivalDate).getTime() * 21 * booking.id!) % 255;
    return `hsla(${h}, 29%, 60%, 0.9)`;
  };

  const getContent = () => {
    const { guest } = booking;
    const title = `${guest.firstName} ${guest.lastName}`;

    return title;
  };

  const getTitle = () => {
    const { firstName, lastName } = booking.guest;
    const { arrivalDate, departureDate } = booking;
    const dateFormat = 'DD-MM-YYYY';
    const title = `${firstName} ${lastName}\nfrom: ${moment(arrivalDate).format(
      dateFormat
    )}\nto: ${moment(departureDate).format(dateFormat)}`;
    return title;
  };

  const { arrivalDate, departureDate } = booking;

  const numberOfDays = countDaysBetweenDates(arrivalDate, departureDate) + 1;

  if (numberOfDays > 0) {
    const style = {
      width: `${numberOfDays * cellWidth}px`,
      backgroundColor: bgColor(),
    };

    return (
      <div className="relative">
        <Link href={routes.editBooking(booking.id!)}>
          <a
            title={getTitle()}
            className="absolute bg-red-300 w-full top-0 transform -translate-y-1/2 h-[41px] py-2 px-3 whitespace-nowrap"
            style={style}
          >
            {getContent()}
          </a>
        </Link>
      </div>
    );
  }

  return <div />;
};

export default BookingCell;
