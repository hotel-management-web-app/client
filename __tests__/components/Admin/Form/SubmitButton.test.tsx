import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmitButton from '../../../../components/Admin/Form/SubmitButton';

describe('Submit Button', () => {
  it('Should render properly', () => {
    const name = 'Click Me!';
    render(<SubmitButton name={name} />);

    const buttonElement = screen.getByText(name);

    expect(buttonElement).toBeInTheDocument();
  });
});
