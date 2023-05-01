import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddButton from '../../../../components/Admin/Table/AddButton';

describe('AddButton', () => {
  it('Should render properly', () => {
    render(<AddButton name="Room Type" />);

    const buttonElement = screen.getByText('Add Room Type');

    expect(buttonElement).toBeInTheDocument();
  });
});
