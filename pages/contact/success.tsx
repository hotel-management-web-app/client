import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import Seo from '../../components/Seo';
import { routes } from '../../utils/routes';

const Success = () => {
  const router = useRouter();

  setTimeout(() => {
    router.push(routes.root());
  }, 10000);

  return (
    <div className="flex justify-center items-center flex-col text-center gap-10 mt-16">
      <Seo title="Successfull payment" />
      <BsCheckCircle size="120" className="text-green-400" />
      <h3 className="text-4xl">Message sent successfully!</h3>
      <p className="text-xl">We will respond to you soon</p>
      <div className="mt-10">
        <p className="mb-10">
          You will be redirected to home page after 10 seconds
        </p>
        <Link href={routes.root()}>
          <a className="bg-black text-white px-6 py-3 text-2xl">Go back now</a>
        </Link>
      </div>
    </div>
  );
};

export default Success;
