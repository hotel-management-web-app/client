import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoomTypesChart from '../../../../components/Admin/Dashboard/RoomTypesChart';

describe('Room Type Chart', () => {
  it('Should render properly', () => {
    render(<RoomTypesChart roomTypes={availableRoomsByRoomTypeCount} />);

    const commentText = screen.getByText(/available rooms by room type/i);

    expect(commentText).toBeInTheDocument();
  });
});

const availableRoomsByRoomTypeCount = [
  { name: 'Single Room', count: 1 },
  { name: 'Double Room', count: 1 },
  { name: 'Deluxe Room', count: 1 },
  { name: 'Dreamer Room', count: 1 },
  { name: 'Premier Room', count: 1 },
];
