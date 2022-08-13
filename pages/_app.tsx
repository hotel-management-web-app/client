import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
