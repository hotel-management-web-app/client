import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import StayDurationInput from '../../../../components/Admin/Form/StayDurationInput';

describe('StayDurationInput', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <StayDurationInput />
      </MockWrapper>
    );

    const labelElement = screen.getByText(/Arrival and departure dates/i);

    expect(labelElement).toBeInTheDocument();
  });
});
