import React from 'react';
import RoomDate from './RoomDate';
import Booking from './Booking';
import { BookingDataProps, RoomsDataProps } from './AvailabilityCalendar';

interface RoomProps {
  dates: Date[];
  bookings: BookingDataProps[];
  cellWidth: number;
  room: RoomsDataProps;
}

const Room: React.FC<RoomProps> = ({ dates, bookings, cellWidth, room }) => {
  const daysTd = dates.map((day) => {
    const bookingsToday = bookings.filter((singleBook) => {
      const fromDate = new Date(singleBook.from_date);
      return !!(
        fromDate.toDateString() === day.toDateString() &&
        singleBook.room_id === room.id
      );
    });

    // get all booking jsx code for current day
    const bookingsTodayJsx = bookingsToday.map((singleBook) => (
      <Booking book={singleBook} key={singleBook.id} cellWidth={cellWidth} />
    ));

    return (
      <RoomDate key={day.getMinutes()} day={day} cellWidth={cellWidth}>
        {bookingsTodayJsx}
      </RoomDate>
    );
  });

  return (
    <tr key={room.id}>
      <td className="border py-2">
        <div>{room.title}</div>
      </td>
      {daysTd}
    </tr>
  );
};

export default Room;
