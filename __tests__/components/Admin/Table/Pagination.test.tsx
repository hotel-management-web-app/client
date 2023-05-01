import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../../../../components/Admin/Table/Pagination';

describe('Pagination', () => {
  it('Should render properly', () => {
    render(<Pagination page={1} pageCount={5} />);

    const pElement = screen.getByText('1');

    expect(pElement).toBeInTheDocument();
  });
});
