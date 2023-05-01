import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '../../components/ContactForm';

const queryClient = new QueryClient();

describe('ContactForm', () => {
  it('Should render properly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ContactForm />
      </QueryClientProvider>
    );

    const pElement = screen.getByTestId('contact-form');

    expect(pElement).toBeInTheDocument();
  });
});
