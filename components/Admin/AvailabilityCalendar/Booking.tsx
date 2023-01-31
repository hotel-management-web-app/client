import React from 'react';
import { BookingDataProps } from './AvailabilityCalendar';

interface BookingProps {
  book: BookingDataProps;
  cellWidth: number;
}

const Booking: React.FC<BookingProps> = ({ book, cellWidth }) => {
  // generate random background color for a booking
  const bgColor = () => {
    const h = (new Date(book.from_date).getTime() * 21 * book.room_id) % 255;
    return `hsla(${h}, 29%, 60%, 0.9)`;
  };

  // get inner content of the booking
  const getContent = () => {
    let title = `AD-${book.adult_count} CD-${book.child_count}`;
    const { guests } = book;
    if (guests.length > 0) {
      title = guests[0].name;
      if (guests.length > 1) {
        title = `${title}(+${guests.length - 1}more)`;
      }
    }
    return title;
  };

  // get title attribute of the booking
  const getTitle = () => {
    const title = [];
    const { guests } = book;
    for (let aa = 0; aa < guests.length; aa += 1) {
      title[aa] = `- ${guests[aa].name}(${guests[aa].age}y)`;
    }
    return `${title.join('\n')}\n  for ${numberOfDays} days`;
  };

  // calculate number of days for which booking is done
  let numberOfDays =
    (new Date(book.to_date).getTime() - new Date(book.from_date).getTime()) /
      (60 * 60 * 24 * 1000) +
    1;

  if (numberOfDays > 0) {
    const style = {
      width: `${numberOfDays * cellWidth}px`,
      backgroundColor: bgColor(),
    };

    return (
      <div className="relative">
        <div
          title={getTitle()}
          className="absolute bg-red-300 w-full top-0 transform -translate-y-1/2 h-[41px] py-2 px-3"
          style={style}
        >
          {getContent()}
        </div>
      </div>
    );
  }

  return <div />;
};

export default Booking;
