import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import EditAboutDetails from '../../../../components/Admin/AboutDetails/EditAboutDetails';

describe('EditAboutDetail', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <EditAboutDetails aboutDetail={aboutDetail} />
      </MockWrapper>
    );

    const buttonElement = screen.getByText(/Edit/i);

    fireEvent.click(buttonElement);

    const headingElement = screen.getByText(/Edit about detail/i);

    expect(headingElement).toBeInTheDocument();
  });
});

const aboutDetail = {
  id: 1,
  image:
    'https://www.ultimacollection.com/application/files/7116/2189/6649/1_-_Mission.jpeg',
  title: 'Mission',
  description:
    'We are on a mission to continuously elevate the traditional hospitality sector and set the trend in tailored, luxury living. It’s the service of a 5-star superior hotel, served to you in utter privacy.',
  aboutInfoId: null,
};
