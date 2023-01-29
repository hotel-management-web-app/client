import React from 'react';
import Room from './Room';

const AvailabilityCalendar = () => {
  const rooms = roomsData;
  const bookings = bookingsData;
  const cellWidth = 46;
  const viewStartDate = Date.now();

  const fillUpDates = () => {
    const datesArray = [];
    let day = new Date();
    if (viewStartDate != null) {
      day = new Date(viewStartDate);
    }

    datesArray.push(new Date(day.setDate(day.getDate())));
    for (let aa = 0; aa < 30; aa += 1) {
      const newDay = new Date(day.setDate(day.getDate() + 1));
      datesArray.push(newDay);
    }

    return datesArray;
  };

  const dates = fillUpDates();

  const renderHeaderDate = () => {
    const datesHtml = dates.map((date) => {
      const months = {
        en: {
          month_names: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          month_names_short: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
      };

      return (
        <th key={date.getTime()} className="border">
          <span className="font-normal">{date.getDate()}</span>
          <div className="font-light">
            {months.en.month_names_short[date.getMonth()]}
          </div>
        </th>
      );
    });

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

  const renderRooms = (room: RoomsDataProps) => (
    <Room
      key={room.id}
      room={room}
      bookings={bookings}
      dates={dates}
      cellWidth={cellWidth}
    />
  );

  const renderTableBody = () => {
    const body = rooms.map((room) => renderRooms(room));
    return <tbody>{body}</tbody>;
  };

  const head = renderHeaderDate();
  const body = renderTableBody();

  return (
    <div>
      <table className="table-fixed border">
        {head}
        {body}
      </table>
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

const roomsData: RoomsDataProps[] = [
  {
    id: 1,
    title: 'Studio',
    category: 'Single',
    roomCount: 1,
    tag: ['non-ac', 'single'],
  },
  {
    id: 2,
    title: 'Double',
    category: 'Royal',
    roomCount: 2,
    tag: ['ac', 'garden-view'],
  },
  {
    id: 3,
    title: 'Executive Suite',
  },
  {
    id: 4,
    title: 'Presidential Suite',
  },
  {
    id: 5,
    title: 'Queen sized',
  },
  {
    id: 6,
    title: 'King sized',
  },
  {
    id: 7,
    title: 'Hollywood Twin Room',
  },
];

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
