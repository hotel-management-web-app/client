import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import AboutDetails from '../../../../components/Admin/AboutDetails/AboutDetails';

describe('AboutDetails', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AboutDetails details={[]} />
      </MockWrapper>
    );

    const headingElement = screen.getByText(/About details/i);

    expect(headingElement).toBeInTheDocument();
  });
});
