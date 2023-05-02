import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import StatusToggler from '../../../../components/Admin/Form/StatusToggler';

describe('Status Toggler', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <StatusToggler
          id="activity-status"
          label="Activity Status"
          checkedValue="Active"
          uncheckedValue="Inactive"
        />
      </MockWrapper>
    );

    const labelElement = screen.getByLabelText('Activity Status');

    expect(labelElement).toBeInTheDocument();
  });
});
