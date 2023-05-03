import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../__mocks__/MockWrapper';
import Dashboard from '../../../pages/admin/dashboard';

describe('Dashboard', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Dashboard />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', { name: /Dashboard/i });

    expect(headingElement).toBeInTheDocument();
  });
});
