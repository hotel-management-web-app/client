import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import AboutBg from '../public/images/about-bg.png';
import Seo from '../components/Seo';

export const getServerSideProps = async () => {
  const data = await axios
    .get(`${process.env.REACT_APP_API}/about-details`)
    .then((res) => res.data);

  return { props: { aboutDetails: data } };
};

interface AboutProps {
  aboutDetails: {
    id: number;
    title: string;
    description: string;
    imgUrl: string;
  }[];
}

const About: React.FC<AboutProps> = ({ aboutDetails }) => (
  <div>
    <Seo title="About Us" />
    <section id="hero" className="relative">
      <Image src={AboutBg} alt="about background" layout="responsive" />
      <h1 className="absolute text-center top-1/4 left-1/2 transform -translate-x-1/2 text-white font-medium text-3xl w-full md:text-6xl md:leading-[80px]">
        About Us
      </h1>
    </section>
    <div className="container max-w-container mx-auto mb-72">
      <p className="font-light text-center mt-20 text-lg w-3/4 mx-auto leading-[30px]">
        Since 2016, we’ve grown from our roots as an award-winning hotel in
        Gstaad, Switzerland, to include a wider collection of chalets and
        waterfront retreats that stretch from the Alps to the Mediterranean.
        And, while we evolve to the changing needs of our guests, we’ve kept
        true to our signature Ultima experience. You will come to expect
        exceptionally high service from our in-house teams, as well as the
        utmost comfort and discretion. Wellbeing and sustainability are also at
        the core of our DNA. Each property has access to its own extensive,
        state-of-the-art wellness amenities and has been artistically curated to
        reflect its natural surroundings.
      </p>
      <div className="mt-40 flex flex-col gap-40 px-8 2xl:px-0 text-center xl:text-left">
        {aboutDetails.map((aboutDetail, index) => (
          <div
            key={aboutDetail.id}
            className={`flex ${
              index % 2 === 1 && 'flex-row-reverse'
            } justify-center xl:justify-between gap-x-20 gap-y-10 flex-wrap-reverse`}
          >
            <div className="w-[500px]">
              <h2 className="text-4xl font-medium">{aboutDetail.title}</h2>
              <p className="font-light text-lg leading-8 mt-5">
                {aboutDetail.description}
              </p>
            </div>
            <Image
              src={aboutDetail.imgUrl}
              alt="about"
              width="525px"
              height="445px"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default About;
