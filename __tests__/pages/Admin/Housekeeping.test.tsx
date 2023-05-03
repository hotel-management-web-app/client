import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../__mocks__/MockWrapper';
import Housekeeping from '../../../pages/admin/housekeeping';

describe('Housekeeping', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Housekeeping />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Housekeeping/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
