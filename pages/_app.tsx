import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../components/Layout';
import AdminLayout from '../components/AdminLayout';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  if (router.pathname.includes('admin')) {
    return (
      <QueryClientProvider client={queryClient}>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
};

export default MyApp;
