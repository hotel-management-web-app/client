import Link from 'next/link';
import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Room } from '../../../lib/types';
import { routes } from '../../../utils/routes';

interface RoomDateProps {
  day: Date;
  cellWidth: number;
  children: React.ReactNode[];
  room: Room;
}

const RoomDate: React.FC<RoomDateProps> = ({
  day,
  cellWidth,
  room,
  children,
}) => (
  <td
    className="border z-0 group cursor-pointer"
    key={day.getTime()}
    style={{ width: `${cellWidth}px`, minWidth: `${cellWidth}px` }}
  >
    {children.length > 0 ? (
      children
    ) : (
      <Link href={routes.addBooking(day, room.roomTypeId, room.id)}>
        <a className="flex justify-center">
          <AiOutlinePlusCircle className="hidden group-hover:block" size="25" />
        </a>
      </Link>
    )}
  </td>
);

export default RoomDate;
