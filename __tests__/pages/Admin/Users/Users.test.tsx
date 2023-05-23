import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import Users from '../../../../pages/admin/users';

describe('Users', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Users />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Users/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
