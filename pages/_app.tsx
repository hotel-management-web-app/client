import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import AdminLayout from '../components/AdminLayout';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  if (router.pathname.includes('admin')) {
    return (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    );
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
