import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import ContactInput from '../../components/ContactInput';

describe('ContactInput', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <ContactInput fieldName="title" placeholder="Title" />
      </MockWrapper>
    );

    const inputElement = screen.getByPlaceholderText('Title');

    expect(inputElement).toBeInTheDocument();
  });
});
