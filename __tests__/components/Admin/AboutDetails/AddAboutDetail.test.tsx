import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import AddAboutDetails from '../../../../components/Admin/AboutDetails/AddAboutDetails';

describe('AddAboutDetail', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AddAboutDetails />
      </MockWrapper>
    );

    const headingElement = screen.getByText(/Add about detail/i);

    expect(headingElement).toBeInTheDocument();
  });
});
