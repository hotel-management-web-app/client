import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormWrapper from '../../../../components/Admin/Form/FormWrapper';

describe('Form Wrapper', () => {
  it('Should render properly', () => {
    render(
      <FormWrapper onSubmit={jest.fn()}>
        <h1>Form</h1>
      </FormWrapper>
    );

    const buttonElement = screen.getByText('Form');

    expect(buttonElement).toBeInTheDocument();
  });
});
