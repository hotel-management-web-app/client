import React from 'react';
import Image from 'next/image';
import AboutImg from '../../public/images/about1.png';
import AddAboutDetails from './AddAboutDetails';
import { useDeleteAboutDetail } from '../../lib/operations/about';
import EditAboutDetails from './EditAboutDetails';
import { AboutDetail } from '../../lib/types';
import useRefreshServerSideProps from '../../lib/hooks/useRefreshServerSideProps';

interface AboutDetailsProps {
  details: AboutDetail[];
}

const AboutDetails: React.FC<AboutDetailsProps> = ({ details }) => {
  const { mutate } = useDeleteAboutDetail();
  const { refresh } = useRefreshServerSideProps();

  const deleteAboutDetail = async (id: number) => {
    await mutate(id);
    refresh();
  };
  return (
    <div className="bg-white px-10 pt-3 pb-7">
      <div className="flex justify-between items-center mt-20">
        <h2 className="font-medium text-lg">About details</h2>
        <AddAboutDetails />
      </div>
      {details.map((detail) => (
        <div key={detail.id} className="flex justify-between mt-10 flex-wrap">
          <div className="flex gap-x-10 gap-y-5 flex-wrap">
            <Image src={AboutImg} alt="about" width="200px" height="200px" />
            <div>
              <h3 className="text-lg font-medium">{detail.title}</h3>
              <p className="mt-3 max-w-[700px]">{detail.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-5 2xl:mt-0">
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
