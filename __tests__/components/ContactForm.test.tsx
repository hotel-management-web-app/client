import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import ContactForm from '../../components/ContactForm';

describe('ContactForm', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <ContactForm />
      </MockWrapper>
    );

    const pElement = screen.getByTestId('contact-form');

    expect(pElement).toBeInTheDocument();
  });
});
