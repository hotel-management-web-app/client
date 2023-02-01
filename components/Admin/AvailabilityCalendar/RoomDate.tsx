import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

interface RoomDateProps {
  day: Date;
  cellWidth: number;
  children: React.ReactNode[];
}

const RoomDate: React.FC<RoomDateProps> = ({ day, cellWidth, children }) => (
  <td
    className="border z-0 group cursor-pointer"
    key={day.getTime()}
    style={{ width: `${cellWidth}px`, minWidth: `${cellWidth}px` }}
  >
    {children.length > 0 ? (
      children
    ) : (
      <div className="flex justify-center">
        <AiOutlinePlusCircle className="hidden group-hover:block" size="25" />
      </div>
    )}
  </td>
);

export default RoomDate;
