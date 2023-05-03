import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import EditGuest from '../../../../pages/admin/guests/edit/[id]';

describe('EditGuest', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <EditGuest />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Edit guest/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
