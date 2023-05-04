import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import Contact from '../../pages/contact';

describe('Contact', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Contact />
      </MockWrapper>
    );

    const headingElement = screen.getByText(/Contact/i);

    expect(headingElement).toBeInTheDocument();
  });

  it('Should submit a contact form', () => {
    render(
      <MockWrapper>
        <Contact />
      </MockWrapper>
    );

    const { getByPlaceholderText, getByTestId } = screen;

    const firstNameInput = getByPlaceholderText(/First Name/i);
    const secondNameInput = getByPlaceholderText(/Second Name/i);
    const emailInput = getByPlaceholderText(/Email/i);
    const phoneInput = getByPlaceholderText(/Phone/i);
    const subjectInput = getByPlaceholderText(/Subject/i);
    const messageInput = getByPlaceholderText(/Message/i);
    const formElement = getByTestId('contact-form');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(secondNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '123456789' } });
    fireEvent.change(subjectInput, { target: { value: 'Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Message' } });

    act(() => {
      fireEvent.submit(formElement);
    });
  });
});
