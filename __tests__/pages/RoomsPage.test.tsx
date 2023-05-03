import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import RoomsPage from '../../pages/rooms/index';

describe('RoomsPage', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <RoomsPage />
      </MockWrapper>
    );

    const divElement = screen.getByRole('heading');

    expect(divElement).toBeInTheDocument();
  });
});
