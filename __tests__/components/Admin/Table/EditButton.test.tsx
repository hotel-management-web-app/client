import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditButton from '../../../../components/Admin/Table/EditButton';

describe('EditButton', () => {
  it('Should render properly', () => {
    render(<EditButton id={1} />);

    const buttonElement = screen.getByText('Edit');

    expect(buttonElement).toBeInTheDocument();
  });
});
