import Link from 'next/link';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import ContactForm from '../../components/ContactForm';
import Error from '../../components/Error';
import Seo from '../../components/Seo';
import { getSettings } from '../../lib/api/generalSettings';
import { useGetSettings } from '../../lib/operations/generalSettings';
import { GeneralSettings } from '../../lib/types';

interface ContactProps {
  settings: GeneralSettings;
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['settings'], getSettings);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Contact: React.FC<ContactProps> = () => {
  const { data: settings, isError, error } = useGetSettings();

  if (isError) return <Error message={(error as any).message as string} />;

  return (
    <div className="container max-w-[800px] mx-auto font-light mb-40 px-5">
      <Seo title="Contact" />
      <h1 className="text-4xl text-center mt-16">Contact</h1>
      <div className="flex items-end">
        <p className="mt-10">Email:</p>
        <Link href={`mailto:${settings?.email}`}>
          <a className="ml-3 underline">{settings?.email}</a>
        </Link>
      </div>
      <div className="flex items-end">
        <p className="mt-2">Phone:</p>
        <Link href={`tel:${settings?.phoneNumber}`}>
          <a className="ml-3 underline">{settings?.phoneNumber}</a>
        </Link>
      </div>
      <ContactForm />
    </div>
  );
};

export default Contact;
