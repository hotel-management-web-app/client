import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import AboutSettings from '../../../../pages/admin/hotel-configuration/about-settings';

describe('AboutSettings', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AboutSettings />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /About settings/i,
    });

    expect(headingElement).toBeInTheDocument();
  });

  it('Should display about detail form', async () => {
    render(
      <MockWrapper>
        <AboutSettings />
      </MockWrapper>
    );

    const addAboutDetailButton = screen.getByRole('button', {
      name: 'Add about detail',
    });

    expect(addAboutDetailButton).toBeInTheDocument();

    fireEvent.click(addAboutDetailButton);
    const titleInput = await screen.getByTestId('add-about-detail-title');
    const descriptionInput = await screen.getByTestId(
      'add-about-detail-description'
    );
    const submitButton = await screen.getAllByRole('button', { name: 'Save' });

    fireEvent.change(titleInput, { target: { value: 'Mission' } });
    fireEvent.change(descriptionInput, {
      target: {
        value:
          'We are on a mission to continuously elevate the traditional hospitality sector and set the trend in tailored, luxury living. It’s the service of a 5-star superior hotel, served to you in utter privacy.',
      },
    });

    fireEvent.click(submitButton[1]);

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();

    expect(addAboutDetailButton).toBeInTheDocument();
  });
});
