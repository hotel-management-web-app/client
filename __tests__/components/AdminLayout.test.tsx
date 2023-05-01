import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminLayout from '../../components/AdminLayout';

describe('AdminLayout', () => {
  it('Should render properly', () => {
    render(
      <AdminLayout>
        <div>
          <p>Admin children</p>
        </div>
      </AdminLayout>
    );

    const pElement = screen.getByText(/Admin children/i);

    expect(pElement).toBeInTheDocument();
  });
});
