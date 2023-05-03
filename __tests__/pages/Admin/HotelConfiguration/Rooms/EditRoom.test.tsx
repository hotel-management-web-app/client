import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../../__mocks__/MockWrapper';
import EditRooms from '../../../../../pages/admin/hotel-configuration/rooms/edit/[id]';

describe('EditRoom', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <EditRooms />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Edit room/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
