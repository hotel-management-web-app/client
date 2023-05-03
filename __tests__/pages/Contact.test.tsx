import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import Contact from '../../pages/contact';

describe('Contact', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Contact />
      </MockWrapper>
    );

    const headingElement = screen.getByText(/Contact/i);

    expect(headingElement).toBeInTheDocument();
  });
});
