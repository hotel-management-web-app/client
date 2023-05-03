import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import AboutSettings from '../../../../pages/admin/hotel-configuration/about-settings';

describe('AboutSettings', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AboutSettings />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /About settings/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
