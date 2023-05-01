import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Entries from '../../../../components/Admin/Table/Entries';

describe('Entries', () => {
  it('Should render properly', () => {
    render(<Entries />);

    const pElement = screen.getByText('Entries');

    expect(pElement).toBeInTheDocument();
  });
});
