import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import EditUser from '../../../../pages/admin/users/edit/[id]';

describe('EditUser', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <EditUser />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Edit user/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
