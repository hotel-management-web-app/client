import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../../__mocks__/MockWrapper';
import AddRoomType from '../../../../../pages/admin/hotel-configuration/room-types/create';

describe('AddRoomType', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AddRoomType />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Add room type/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
