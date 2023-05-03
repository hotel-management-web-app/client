import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import AdminNavbar from '../../components/AdminNavbar';

describe('AdminNavbar', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AdminNavbar />
      </MockWrapper>
    );

    const aElement = screen.getByText(/Profile/i);

    expect(aElement).toBeInTheDocument();
  });
});
