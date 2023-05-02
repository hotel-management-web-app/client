import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import AdminLayout from '../../components/AdminLayout';

describe('AdminLayout', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AdminLayout>
          <div>
            <p>Admin children</p>
          </div>
        </AdminLayout>
      </MockWrapper>
    );

    const pElement = screen.getByText(/Admin children/i);

    expect(pElement).toBeInTheDocument();
  });
});
