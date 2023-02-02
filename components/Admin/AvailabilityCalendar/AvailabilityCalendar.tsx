import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Booking, Room, RoomType } from '../../../lib/types';
import RoomCell from './RoomCell';

interface AvailabilityCalendarProps {
  roomTypes?: RoomType[];
  bookingsProp?: Booking[];
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  roomTypes,
  bookingsProp,
}) => {
  const rooms = [];
  const bookings = bookingsProp;
  const cellWidth = 45;
  const date = new Date(Date.now());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const monthName = new Date(year, month, 1).toLocaleString('en-us', {
    month: 'long',
  });

  const getAllDaysInMonth = (yearProp: number, monthProp: number) => {
    const tempDate = new Date(yearProp, monthProp, 1);

    const tempDates = [];

    while (tempDate.getMonth() === monthProp) {
      tempDates.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
    }

    return tempDates;
  };

  const dates = getAllDaysInMonth(year, month);

  const renderHeaderDate = () => {
    const datesHtml = dates.map((tempDate) => (
      <th key={nanoid()} className="border">
        <span className="font-normal">{tempDate.getDate()}</span>
      </th>
    ));

    return (
      <thead>
        <tr>
          <th className="sticky left-0 z-10 bg-white border">
            <div className="w-48">ROOMS</div>
          </th>
          {datesHtml}
        </tr>
      </thead>
    );
  };

  const renderRooms = (room: Room) => (
    <RoomCell
      key={room.id}
      room={room}
      bookings={bookings!}
      dates={dates}
      cellWidth={cellWidth}
    />
  );

  const renderTableBody = () => {
    roomTypes?.forEach((roomType) => {
      roomType.rooms?.forEach((room) => {
        rooms.push(room);
      });
    });

    const emptyCells = dates.map(() => (
      <td key={nanoid()} className="border border-gray-300 bg-gray-200" />
    ));

    const body = roomTypes?.map((roomType) => {
      const tempRooms = roomType.rooms?.map((room) => renderRooms(room));
      return (
        <>
          <tr>
            <td className="border text-center whitespace-nowrap px-3 py-2  sticky left-0 z-10 bg-white">
              {roomType.name}
            </td>
            {emptyCells}
          </tr>
          {tempRooms}
        </>
      );
    });

    return <tbody>{body}</tbody>;
  };

  const previousMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 0) return 11;
      return prevMonth - 1;
    });
    if (month === 0) setYear((prevYear) => prevYear - 1);
  };

  const nextMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 11) return 0;
      return prevMonth + 1;
    });

    if (month === 11) setYear((prevYear) => prevYear + 1);
  };

  const head = renderHeaderDate();
  const body = renderTableBody();

  return (
    <div>
      <div className="flex mb-5 justify-center items-center gap-5">
        <button
          className="bg-transparent hover:bg-gray-400 text-gray-400 font-semibold hover:text-white py-1 px-2 border border-gray-400 hover:border-transparent rounded"
          onClick={previousMonth}
        >
          Prev Month
        </button>
        <p className="text-center text-xl">
          {monthName}
          &nbsp;
          {year}
        </p>
        <button
          className="bg-transparent hover:bg-gray-400 text-gray-400 font-semibold hover:text-white py-1 px-2 border border-gray-400 hover:border-transparent rounded"
          onClick={nextMonth}
        >
          Next Month
        </button>
      </div>
      <div className="overflow-hidden">
        <ScrollContainer className="scroll-container" ignoreElements="td">
          <table className="table-fixed border">
            {head}
            {body}
          </table>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
