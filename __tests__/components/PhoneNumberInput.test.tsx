import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import PhoneNumberInput from '../../components/PhoneNumberInput';

describe('PhoneNumberInput', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <PhoneNumberInput />
      </MockWrapper>
    );

    const phoneNumberInputElement = screen.getByPlaceholderText('Phone number');

    expect(phoneNumberInputElement).toBeInTheDocument();
  });
});
