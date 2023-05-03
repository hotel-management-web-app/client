import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../../__mocks__/MockWrapper';
import EditRoomType from '../../../../../pages/admin/hotel-configuration/room-types/edit/[id]';

describe('EditRoomType', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <EditRoomType />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Edit room type/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
