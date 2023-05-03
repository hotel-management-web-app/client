import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoomImages from '../../components/RoomImages';

describe('RoomImages', () => {
  it('Should render properly', () => {
    render(<RoomImages images={['']} />);

    const roomImagesElement = screen.getByTestId('room-images');

    expect(roomImagesElement).toBeInTheDocument();
  });
});
