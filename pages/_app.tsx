import React from 'react';
import axios from 'axios';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import Layout from '../components/Layout';
import AdminLayout from '../components/AdminLayout';
import '../styles/globals.css';
import { getSettings } from '../lib/api/generalSettings';
import { Context } from '../lib/context';
import { GeneralSettings } from '../lib/types';

interface MyAppProps extends AppProps {
  settings: GeneralSettings;
  pageProps: {
    dehydratedState: unknown;
  };
}

const MyApp = ({ Component, pageProps, settings }: MyAppProps) => {
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
    <Context.Provider value={settings}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </Context.Provider>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);

  const settings = await getSettings();

  return { ...ctx, settings };
};

export default MyApp;
