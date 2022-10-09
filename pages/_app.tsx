import React from 'react';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../components/Layout';
import AdminLayout from '../components/AdminLayout';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

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
