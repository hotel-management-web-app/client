import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../__mocks__/MockWrapper';
import Profile from '../../../pages/admin/profile';

describe('Profile', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Profile />
      </MockWrapper>
    );

    const divElement = screen.getByText(/Profile/i);

    expect(divElement).toBeInTheDocument();
  });
});
