import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../../../components/Admin/Table/Header';

describe('Header', () => {
  it('Should render properly', () => {
    const title = 'Header';
    render(<Header title={title} />);

    const headingElement = screen.getByRole('heading');

    expect(headingElement).toBeInTheDocument();
  });
});
