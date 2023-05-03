import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import About from '../../pages/about';

describe('About', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <About aboutInfo={aboutInfo} aboutDetails={[]} />
      </MockWrapper>
    );

    const headingElement = screen.getByText(/About us/i);

    expect(headingElement).toBeInTheDocument();
  });
});

const aboutInfo = {
  id: 1,
  title: 'Welcome to our hotels',
  description:
    'Since 2016, we’ve grown from our roots as an award-winning hotel in Gstaad, Switzerland, to include a wider collection of chalets and waterfront retreats that stretch from the Alps to the Mediterranean. And, while we evolve to the changing needs of our guests, we’ve kept true to our signature Ultima experience. You will come to expect exceptionally high service from our in-house teams, as well as the utmost comfort and discretion.Wellbeing and sustainability are also at the core of our DNA. Each property has access to its own extensive, state-of-the-art wellness amenities and has been artistically curated to reflect its natural surroundings.',
  aboutDetails: [],
};
