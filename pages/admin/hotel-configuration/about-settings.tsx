import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Seo from '../../../components/Seo';
import {
  FormWrapper,
  Header,
  Input,
  SubmitButton,
  Textarea,
} from '../../../components/Admin';
import { getAboutInfo } from '../../../lib/api/about';
import { AboutDetail, AboutInfo } from '../../../lib/types';
import { getAboutDetails } from '../../../lib/api/aboutDetails';
import { useUpdateAboutInfo } from '../../../lib/operations/about';
import AboutDetails from '../../../components/Admin/AboutDetails';

interface AboutSettingsPageProps {
  aboutInfo: AboutInfo;
  aboutDetails: AboutDetail[];
}

export const getServerSideProps = async () => {
  const aboutInfo = await getAboutInfo();
  const aboutDetails = await getAboutDetails();

  return { props: { aboutInfo, aboutDetails } };
};

const AboutSettingsPage: React.FC<AboutSettingsPageProps> = ({
  aboutInfo,
  aboutDetails,
}) => {
  const methods = useForm<AboutInfo>();
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useUpdateAboutInfo();

  const onSubmit: SubmitHandler<AboutInfo> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <Seo title="About settings" />
      <Header title="About settings" />
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto lg:w-2/3 2xl:w-1/2 my-5">
            <Input id="title" title="Title" defaultValue={aboutInfo.title} />
            <div className="mt-5">
              <Textarea
                id="title"
                title="Description"
                rows="8"
                defaultValue={aboutInfo.description}
              />
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <SubmitButton name="Save" isLoading={isLoading} />
          </div>
        </FormWrapper>
      </FormProvider>
      <AboutDetails details={aboutDetails} />
    </div>
  );
};

export default AboutSettingsPage;
