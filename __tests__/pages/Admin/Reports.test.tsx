import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../__mocks__/MockWrapper';
import Reports from '../../../pages/admin/reports';

describe('Reports', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Reports />
      </MockWrapper>
    );

    const divElement = screen.getByText(/Reports/i);

    expect(divElement).toBeInTheDocument();
  });
});
