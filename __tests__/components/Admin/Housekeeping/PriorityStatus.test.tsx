import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import PriorityStatusOptions from '../../../../components/Admin/Housekeeping/PriorityStatus';

describe('PriorityStatusOptions', () => {
  it('Should render properly', () => {
    const status = 'High';
    render(
      <MockWrapper>
        <PriorityStatusOptions id={1} status={status} />
      </MockWrapper>
    );

    const statusText = screen.getByTestId('priority-status');

    expect(statusText).toBeInTheDocument();
  });
});
