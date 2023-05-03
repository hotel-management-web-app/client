import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import AddGuest from '../../../../pages/admin/guests/create';

describe('AddGuest', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AddGuest />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Add guest/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
