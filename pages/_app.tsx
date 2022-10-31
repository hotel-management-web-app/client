import React from 'react';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import Layout from '../components/Layout';
import AdminLayout from '../components/AdminLayout';
import '../styles/globals.css';

interface MyAppProps extends AppProps {
  pageProps: {
    dehydratedState: unknown;
  };
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

  if (router.pathname.includes('admin')) {
    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        </Hydrate>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
