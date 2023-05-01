import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '../../components/Error';

describe('ErrorMessage', () => {
  it('Should render properly', () => {
    const errorText = 'Error has occured!';
    render(<Error message={errorText} />);

    const pElement = screen.getByText(errorText);

    expect(pElement).toBeInTheDocument();
  });
});
