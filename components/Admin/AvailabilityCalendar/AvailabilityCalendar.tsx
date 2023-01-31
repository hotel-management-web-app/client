import React, { useEffect, useRef, useState } from 'react';
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

  // console.log(roomTypes);
  console.log(bookingsProp);

  const bookings = bookingsData;
  const cellWidth = 46;
  // const viewStartDate = Date.now();
  const date = new Date(Date.now());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const scrollRef = useRef(null);
  const monthName = new Date(year, month, 1).toLocaleString('en-us', {
    month: 'long',
  });

  useEffect(() => {
    if (scrollRef.current) {
      console.log(scrollRef.current);
    }
  }, []);

  function getAllDaysInMonth(yearProp: number, monthProp: number) {
    const tempDate = new Date(yearProp, monthProp, 1);

    const tempDates = [];

    while (tempDate.getMonth() === monthProp) {
      tempDates.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
    }

    return tempDates;
  }

  const dates = getAllDaysInMonth(year, month);

  const renderHeaderDate = () => {
    const datesHtml = dates.map((tempDate) => (
      <th key={tempDate.getTime()} className="border">
        <span className="font-normal">{tempDate.getDate()}</span>
      </th>
    ));

    return (
      <thead className="border">
        <tr>
          <th>
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
      bookings={bookings}
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
      <td className="border border-gray-300 bg-gray-200" />
    ));
    const body = roomTypes?.map((roomType) => {
      const tempRooms = roomType.rooms?.map((room) => renderRooms(room));
      return (
        <>
          <tr>
            <td className="border text-center whitespace-nowrap px-3 py-2">
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

  // const onEndScroll = () => {
  //   console.log('onEndScroll', scrollRef?.current?.scrollLeft);
  // };

  const head = renderHeaderDate();
  const body = renderTableBody();

  return (
    <div>
      <div className="flex mb-3 justify-center gap-5">
        <button className="bg-red-400" onClick={previousMonth}>
          Prev Month
        </button>
        <p className="text-center text-xl">
          {monthName}
          &nbsp;
          {year}
        </p>
        <button className="bg-red-400" onClick={nextMonth}>
          Next Month
        </button>
      </div>
      <ScrollContainer
        innerRef={scrollRef}
        className="scroll-container"
        ignoreElements="td"
      >
        <table className="table-fixed border">
          {head}
          {body}
        </table>
      </ScrollContainer>
    </div>
  );
};

export interface RoomsDataProps {
  id: number;
  title: string;
  category?: string;
  roomCount?: number;
  tag?: string[];
}

export interface BookingDataProps {
  id: number;
  room_id: number;
  guest_name: string;
  objective: string;
  unit: number;
  channel: string;
  adult_count: number;
  child_count: number;
  guests: {
    name: string;
    age: number;
  }[];
  from_date: string;
  to_date: string;
}

const bookingsData: BookingDataProps[] = [
  {
    id: 1,
    room_id: 2,
    guest_name: 'Aman',
    objective: 'work',
    unit: 2,
    channel: 'offline',
    adult_count: 2,
    child_count: 0,
    guests: [
      {
        name: 'Mr. Abdyl',
        age: 30,
      },
      {
        name: 'Mrs. Agnesa',
        age: 25,
      },
    ],
    from_date: '2023-01-29',
    to_date: '2023-02-06',
  },
  {
    id: 2,
    room_id: 4,
    guest_name: 'Aman',
    objective: 'tour',
    unit: 3,
    channel: 'online',
    adult_count: 2,
    child_count: 1,
    guests: [
      {
        name: 'Mr. Altin',
        age: 35,
      },
      {
        name: 'Mrs. Zjarrta',
        age: 29,
      },
      {
        name: 'Ms. Zerina',
        age: 3,
      },
    ],
    from_date: '2023-02-01',
    to_date: '2023-02-09',
  },
];

export default AvailabilityCalendar;
