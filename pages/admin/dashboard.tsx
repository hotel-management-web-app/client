import React from 'react';
import dynamic from 'next/dynamic';
import { dehydrate, QueryClient } from 'react-query';
import Seo from '../../components/Seo';
import { getDashboardData } from '../../lib/api/dashboard';
import { useGetDashboardData } from '../../lib/operations/dashboard';

const Dashboard = dynamic(() => import('../../components/Admin/Dashboard'), {
  ssr: false,
});

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['dashboard'], getDashboardData);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const DashboardPage = () => {
  const { data: dashboardData } = useGetDashboardData();

  return (
    <div>
      <Seo title="Dashboard" />
      <h1 className="text-2xl">Dashboard</h1>
      <Dashboard dashboardData={dashboardData} />
    </div>
  );
};

export default DashboardPage;
