import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../../../../components/Admin/Table/Search';

describe('Search', () => {
  it('Should render properly', () => {
    render(<Search />);

    const pElement = screen.getByText('Search');

    expect(pElement).toBeInTheDocument();
  });
});
