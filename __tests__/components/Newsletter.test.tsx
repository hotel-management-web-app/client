import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Newsletter from '../../components/Newsletter';

describe('Newsletter', () => {
  it('Should render properly', () => {
    render(<Newsletter />);

    const headingElement = screen.getByRole('heading', {
      name: /stay up to date/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
