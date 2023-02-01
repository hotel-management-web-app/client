import React from 'react';
import RoomDate from './RoomDate';
import BookingCell from './BookingCell';
import { Booking, Room } from '../../../lib/types';

interface RoomProps {
  dates: Date[];
  bookings: Booking[];
  cellWidth: number;
  room: Room;
}

const RoomCell: React.FC<RoomProps> = ({
  dates,
  bookings,
  cellWidth,
  room,
}) => {
  const daysTd = dates.map((day) => {
    const bookingsToday = bookings.filter((singleBook) => {
      const fromDate = new Date(singleBook.arrivalDate);
      return !!(
        fromDate.toDateString() === day.toDateString() &&
        singleBook.roomId === room.id
      );
    });

    const bookingsTodayJsx = bookingsToday.map((singleBook) => (
      <BookingCell
        book={singleBook}
        key={singleBook.id}
        cellWidth={cellWidth}
      />
    ));

    return (
      <RoomDate key={day.getMinutes()} day={day} cellWidth={cellWidth}>
        {bookingsTodayJsx}
      </RoomDate>
    );
  });

  return (
    <tr key={room.id}>
      <td className="border py-2 px-4 sticky left-0 z-10 bg-white">
        <div className="whitespace-nowrap text-center">{room.roomNumber}</div>
      </td>
      {daysTd}
    </tr>
  );
};

export default RoomCell;
