import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import HousekeepingStatusOptions from '../../../../components/Admin/Housekeeping/HousekeepingStatus';

describe('HousekeepingStatusOptions', () => {
  it('Should render properly', () => {
    const status = 'Confirmed';
    render(
      <MockWrapper>
        <HousekeepingStatusOptions id={1} status={status} />
      </MockWrapper>
    );

    const statusText = screen.getByTestId('housekeeping-status');

    expect(statusText).toBeInTheDocument();
  });
});
