import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from 'react-query';

interface MockWrapperProps {
  children: React.ReactNode;
}

const MockWrapper: React.FC<MockWrapperProps> = ({ children }) => {
  const queryClient = new QueryClient();
  const methods = useForm();
  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>{children}</FormProvider>{' '}
    </QueryClientProvider>
  );
};

export default MockWrapper;
