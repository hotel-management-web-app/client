import React from 'react';

interface RoomDateProps {
  day: Date;
  cellWidth: number;
  children: React.ReactNode;
}

const RoomDate: React.FC<RoomDateProps> = ({ day, cellWidth, children }) => (
  <td
    className="border z-0"
    key={day.getTime()}
    style={{ width: `${cellWidth}px`, minWidth: `${cellWidth}px` }}
  >
    {children}
  </td>
);

export default RoomDate;
