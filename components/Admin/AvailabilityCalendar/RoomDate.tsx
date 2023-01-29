import React from 'react';

interface RoomDateProps {
  day: Date;
  cellWidth: number;
  children: React.ReactNode;
}

const RoomDate: React.FC<RoomDateProps> = ({ day, cellWidth, children }) => (
  <td
    className="border"
    key={day.getTime()}
    style={{ width: `${cellWidth}px` }}
  >
    {children}
  </td>
);

export default RoomDate;
