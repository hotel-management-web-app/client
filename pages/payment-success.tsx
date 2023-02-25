import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import Seo from '../components/Seo';
import { useCreateNewBooking } from '../lib/operations/payment';
import { routes } from '../utils/routes';

const PaymentSuccess = () => {
  const router = useRouter();

  const { session_id: sessionId } = router.query;
  const { mutate } = useCreateNewBooking();

  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      mutate(sessionId as string);
    }
  }, [mutate, sessionId]);

  // setTimeout(() => {
  //   router.push(routes.root());
  // }, 10000);

  return (
    <div className="flex justify-center items-center flex-col text-center gap-10 mt-16">
      <Seo title="Successfull payment" />
      <BsCheckCircle size="120" className="text-green-400" />
      <h3 className="text-4xl">Transaction Completed Successfully</h3>
      <p className="text-xl">Thank you for your billing</p>
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

export default PaymentSuccess;
