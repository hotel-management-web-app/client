import React from 'react';
import Image from 'next/image';
import AboutBg from '../public/images/about-bg.png';
import AboutImg from '../public/images/about1.png';
import Seo from '../components/Seo';
import { getAboutDetails } from '../lib/api/aboutDetails';
import { getAboutInfo } from '../lib/api/about';
import { AboutDetail, AboutInfo } from '../lib/types';

export const getServerSideProps = async () => {
  const aboutInfo = await getAboutInfo();
  const aboutDetails = await getAboutDetails();

  return { props: { aboutInfo, aboutDetails } };
};

interface AboutProps {
  aboutInfo: AboutInfo;
  aboutDetails: AboutDetail[];
}

const About: React.FC<AboutProps> = ({ aboutInfo, aboutDetails }) => (
  <div>
    <Seo title="About Us" />
    <section id="hero" className="relative">
      <Image src={AboutBg} alt="about background" layout="responsive" />
      <h1 className="absolute text-center top-1/4 left-1/2 transform -translate-x-1/2 text-white font-medium text-3xl w-full md:text-6xl md:leading-[80px]">
        About Us
      </h1>
    </section>
    <div className="container max-w-container mx-auto mb-72">
      <h2 className="mt-10 text-center font-medium text-3xl">
        {aboutInfo.title}
      </h2>
      <p className="font-light text-center mt-10 text-lg w-3/4 mx-auto leading-[30px]">
        {aboutInfo.description}
      </p>
      <div className="mt-40 flex flex-col gap-40 px-8 2xl:px-0 text-center xl:text-left">
        {aboutDetails.map(({ id, title, description }, index) => (
          <div
            key={id}
            className={`flex ${
              index % 2 === 1 && 'flex-row-reverse'
            } justify-center xl:justify-between gap-x-20 gap-y-10 flex-wrap-reverse`}
          >
            <div className="w-[500px]">
              <h2 className="text-4xl font-medium">{title}</h2>
              <p className="font-light text-lg leading-8 mt-5">{description}</p>
            </div>
            <Image src={AboutImg} alt="about" width="525px" height="445px" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default About;
