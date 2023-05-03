import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import Guests from '../../../../pages/admin/guests';

describe('Guests', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Guests />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Guests/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
