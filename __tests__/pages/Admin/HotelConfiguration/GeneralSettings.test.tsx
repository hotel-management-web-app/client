import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import GeneralSettings from '../../../../pages/admin/hotel-configuration/general-settings';

describe('GeneralSettings', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <GeneralSettings />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /General settings/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
