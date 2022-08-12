import React from 'react';
import Head from 'next/head'
import Image from 'next/image';
import AboutBg from '../public/about-bg.png';

const details = [
  {
    title: 'Mission',
    description:
      'We are on a mission to continuously elevate the traditional hospitality sector and set the trend in tailored, luxury living. It’s the service of a 5-star superior hotel, served to you in utter privacy.',
    imgUrl: '/../public/about1.png',
  },
  {
    title: 'Vision',
    description:
      'Our vision is to create properties rich in character in the world’s most exclusive and desirable destinations. Plus, our commitment to sustainability starts at the beginning. We use local resources to thoughtfully create each of our properties, such as woods in high supply from nearby forests, produce from locally owned businesses and solar panels for renewable energy.',
    imgUrl: '/../public/about2.png',
  },
  {
    title: 'Values',
    description:
      'Authenticity, sustainability, and a personalised service lie at the core of our identity. Each of our staff is handpicked because of their unwavering standards, whether it’s a trailblazing chef from a renowned restaurant or a wellness coach that’s perfectly suited to you.',
    imgUrl: '/../public/about3.png',
  },
];

const about = () => {
  return (
    <div>
      <Head>
        <title>About Us</title>
      </Head>
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
          utmost comfort and discretion. <br />
          <br /> Wellbeing and sustainability are also at the core of our DNA.
          Each property has access to its own extensive, state-of-the-art
          wellness amenities and has been artistically curated to reflect its
          natural surroundings.
        </p>
        <div className="mt-40 flex flex-col gap-40 px-8 2xl:px-0 text-center xl:text-left">
          {details.map((detail, index) => (
            <>
              {index % 2 === 0 ? (
                <div key={index} className="flex justify-center xl:justify-between gap-x-20 gap-y-10 flex-wrap-reverse">
                  <div className="w-[500px]">
                    <h2 className="text-4xl font-medium">{detail.title}</h2>
                    <p className="font-light text-lg leading-8 mt-5">
                      {detail.description}
                    </p>
                  </div>
                  <Image
                    src={detail.imgUrl}
                    alt="about"
                    width="525px"
                    height="445px"
                  />
                </div>
              ) : (
                <div key={index} className="flex justify-center xl:justify-between gap-x-20 gap-y-10 flex-wrap">
                  <Image
                    src={detail.imgUrl}
                    alt="about"
                    width="525px"
                    height="445px"
                  />
                  <div className="w-[500px]">
                    <h2 className="text-4xl font-medium">{detail.title}</h2>
                    <p className="font-light text-lg leading-8 mt-5">
                      {detail.description}
                    </p>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default about;
