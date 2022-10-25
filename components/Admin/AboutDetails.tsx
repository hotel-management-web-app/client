import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AboutImg from '../../public/images/about1.png';
import AddAboutDetails from './AddAboutDetails';
import { useDeleteAboutDetail } from '../../lib/operations/about';
import EditAboutDetails from './EditAboutDetails';
import { AboutDetail } from '../../lib/types';

interface AboutDetailsProps {
  details: AboutDetail[];
}

const AboutDetails: React.FC<AboutDetailsProps> = ({ details }) => {
  const { mutate } = useDeleteAboutDetail();
  const router = useRouter();

  const deleteAboutDetail = async (id: number) => {
    await mutate(id);
    router.replace(router.asPath);
  };
  return (
    <div className="bg-white px-10 pt-3 pb-7">
      <div className="flex justify-between items-center mt-20">
        <h2 className="font-medium text-lg">About details</h2>
        <AddAboutDetails />
      </div>
      {details.map((detail) => (
        <div key={detail.id} className="flex justify-between mt-10">
          <div className="flex gap-10">
            <Image src={AboutImg} alt="about" width="200px" height="200px" />
            <div className="w-1/2">
              <h3 className="text-lg font-medium">{detail.title}</h3>
              <p className="mt-3">{detail.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <EditAboutDetails aboutDetail={detail} />
            <button
              className="text-white bg-red-500 px-5 py-1 rounded-lg"
              onClick={() => deleteAboutDetail(detail.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutDetails;
