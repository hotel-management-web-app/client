import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArrivalsAndDepartures from '../../../../components/Admin/Dashboard/ArrivalsAndDepartures';

describe('Arrivals AndD epartures', () => {
  it('Should render properly', () => {
    render(<ArrivalsAndDepartures data={arrivalsAndDeparturesToday} />);

    const commentText = screen.getByTestId('arrivals-departures');

    expect(commentText).toBeInTheDocument();
  });
});

const arrivalsAndDeparturesToday = { arrivalsToday: [], departuresToday: [] };
