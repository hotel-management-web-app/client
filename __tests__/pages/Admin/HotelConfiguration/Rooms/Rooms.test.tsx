import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../../__mocks__/MockWrapper';
import Rooms from '../../../../../pages/admin/hotel-configuration/rooms';

describe('Rooms', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Rooms />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Rooms/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
