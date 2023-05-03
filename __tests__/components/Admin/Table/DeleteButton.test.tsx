import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteButton from '../../../../components/Admin/Table/DeleteButton';

describe('DeleteButton', () => {
  it('Should render properly', () => {
    render(<DeleteButton deleteHandler={() => {}} />);

    const buttonElement = screen.getByText('Delete');

    expect(buttonElement).toBeInTheDocument();
  });
});
