import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../../__mocks__/MockWrapper';
import AddRoom from '../../../../../pages/admin/hotel-configuration/rooms/create';

describe('AddRoom', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AddRoom />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Add room/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
