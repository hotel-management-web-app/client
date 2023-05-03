import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import Login from '../../pages/login';

describe('Login', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Login />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading');

    expect(headingElement).toBeInTheDocument();
  });
});
