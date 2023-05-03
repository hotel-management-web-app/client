import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Seo from '../../../components/Seo';
import Error from '../../../components/Error';
import {
  FormWrapper,
  Header,
  Input,
  SubmitButton,
  Textarea,
} from '../../../components/Admin';
import { getAboutInfo } from '../../../lib/api/about';
import { AboutInfo } from '../../../lib/types';
import { getAboutDetails } from '../../../lib/api/aboutDetails';
import {
  useGetAboutDetails,
  useGetAboutInfo,
  useUpdateAboutInfo,
} from '../../../lib/operations/about';
import AboutDetails from '../../../components/Admin/AboutDetails/AboutDetails';
import ErrorMessage from '../../../components/ErrorMessage';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['aboutInfo'], getAboutInfo);
  await queryClient.prefetchQuery(['aboutDetails'], getAboutDetails);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const AboutSettingsPage = () => {
  const methods = useForm<AboutInfo>();
  const { handleSubmit } = methods;

  const {
    data: aboutInfo,
    isError: isAboutInfoError,
    error: aboutInfoError,
  } = useGetAboutInfo();
  const {
    data: aboutDetails,
    isError: isAboutDetailsError,
    error: aboutDetailsError,
  } = useGetAboutDetails();
  const { mutate, isLoading, isError, error } = useUpdateAboutInfo();

  const onSubmit: SubmitHandler<AboutInfo> = (data) => {
    mutate(data);
  };

  if (isAboutInfoError) return <Error message={aboutInfoError.message} />;
  if (isAboutDetailsError) return <Error message={aboutDetailsError.message} />;

  return (
    <div>
      <Seo title="About settings" />
      <Header title="About settings" />
      <FormProvider {...methods}>
        {isError && <ErrorMessage errorMessage={error.message} />}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto lg:w-2/3 2xl:w-1/2 my-5">
            <Input id="title" title="Title" defaultValue={aboutInfo?.title} />
            <div className="mt-5">
              <Textarea
                id="title"
                title="Description"
                rows="8"
                defaultValue={aboutInfo?.description}
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
