import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import ContactPhoneNumberInput from '../../components/ContactPhoneNumberInput';

describe('ContactPhoneNumberInput', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <ContactPhoneNumberInput />
      </MockWrapper>
    );

    const phoneNumberInputElement = screen.getByPlaceholderText('Phone number');

    expect(phoneNumberInputElement).toBeInTheDocument();
  });
});
