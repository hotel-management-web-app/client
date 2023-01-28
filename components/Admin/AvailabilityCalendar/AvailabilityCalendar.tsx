import React from 'react';
import { DayPilot, DayPilotScheduler } from 'daypilot-pro-react';
import { RoomType, Booking } from '../../../lib/types';

/**
 * TODO: Scheduler
 * * Add types
 * * Change tile size to bigger
 * * Don't move events to room type fields if possible
 * ! Redirect to booking form on select dates
 * ! Send API requests to change dates on backend when events are moved
 * ! Change Schedule styling if possible
 * ! Remove "DEMO" text if possible
 */

interface AvailabilityCalendarProps {
  roomTypes?: RoomType[];
  bookings?: Booking[];
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  roomTypes,
  bookings,
}) => {
  if (roomTypes && bookings) {
    const startDate = '2023-01-20';
    const days = 365;
    const scale = 'Day';
    const timeHeaders: DayPilot.TimeHeaderData[] = [
      { groupBy: 'Month' },
      { groupBy: 'Day', format: 'd' },
    ];

    // console.log(roomTypes);
    console.log(bookings);

    const events: DayPilot.EventData[] = bookings.map((booking) => ({
      start: new DayPilot.Date(booking.arrivalDate),
      end: new DayPilot.Date(booking.departureDate),
      id: booking.id!,
      text: `${booking.guest.firstName} ${booking.guest.lastName}`,
      resource: booking.room.roomNumber,
    }));

    const resources: DayPilot.ResourceData[] = roomTypes.map((roomType) => ({
      id: roomType.id!,
      name: roomType.name,
      preventUsage: true,
      expanded: true,
      children: roomType.rooms?.map((room) => ({
        id: room.roomNumber!,
        name: String(room.roomNumber),
      })),
    }));

    // console.log(resources);

    return (
      <div>
        <DayPilotScheduler
          startDate={startDate}
          days={days}
          scale={scale}
          timeHeaders={timeHeaders}
          treeEnabled
          events={events}
          resources={resources}
          cellWidth={60}
          eventHeight={50}
        />
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default AvailabilityCalendar;
