import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import Home from '../../pages/index';

describe('Home', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Home />
      </MockWrapper>
    );

    const headingElement = screen.getByText(/About us/i);

    expect(headingElement).toBeInTheDocument();
  });
});
