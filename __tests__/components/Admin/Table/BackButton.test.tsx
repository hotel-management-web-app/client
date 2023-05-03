import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackButton from '../../../../components/Admin/Table/BackButton';

describe('BackButton', () => {
  it('Should render properly', () => {
    render(<BackButton name="Room Types" url="room-types" />);

    const linkElement = screen.getByRole('link', {
      name: /go back to room types/i,
    });

    expect(linkElement).toBeInTheDocument();
  });
});
