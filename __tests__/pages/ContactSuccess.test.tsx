import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import ContactSuccess from '../../pages/contact/success';

describe('ContactSuccess', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <ContactSuccess />
      </MockWrapper>
    );

    const headingElement = screen.getByText(/Message sent successfully!/i);

    expect(headingElement).toBeInTheDocument();
  });
});
