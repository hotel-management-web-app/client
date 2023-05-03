import React, { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { FileUploader } from 'react-drag-drop-files';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import FormWrapper from '../../../components/Admin/Form/FormWrapper';
import Header from '../../../components/Admin/Table/Header';
import Seo from '../../../components/Seo';
import Input from '../../../components/Admin/Form/Input';
import Error from '../../../components/Error';
import { SubmitButton } from '../../../components/Admin';
import { getSettings } from '../../../lib/api/generalSettings';
import {
  useGetSettings,
  useUpdateSettings,
} from '../../../lib/operations/generalSettings';
import { GeneralSettings } from '../../../lib/types';
import { generalSettingsSchema } from '../../../lib/schemas';
import ErrorMessage from '../../../components/ErrorMessage';

const fileTypes = ['JPG', 'PNG', 'GIF'];

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['settings'], getSettings);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const GeneralSettingsPage = () => {
  const {
    data: settings,
    isError: isSettingsError,
    error: settingsError,
  } = useGetSettings();
  const methods = useForm<GeneralSettings>({
    resolver: yupResolver(generalSettingsSchema),
    mode: 'onChange',
  });
  const { handleSubmit, setValue } = methods;
  const [file, setFile] = useState<string | Blob | undefined>(settings?.logo);

  const {
    mutate,
    isLoading,
    isError: isMutationError,
    error: mutationError,
  } = useUpdateSettings();

  const handleChange = (selectedFile: Blob) => {
    const imageUrl = URL.createObjectURL(selectedFile);
    setValue('logo', selectedFile);
    setFile(imageUrl);
  };

  const onSubmit: SubmitHandler<GeneralSettings> = (data) => {
    const { logo, hotelName, country, email, phoneNumber } = data;
    const form = new FormData();

    form.append(
      'data',
      JSON.stringify({ hotelName, country, email, phoneNumber })
    );
    if (logo) form.append('logo', logo);
    mutate(form);
  };

  if (isSettingsError) {
    return <Error message={(settingsError as any).message as string} />;
  }

  return (
    <div>
      <Seo title="General settings" />
      <Header title="General settings" />
      <FormProvider {...methods}>
        {isMutationError && (
          <ErrorMessage errorMessage={mutationError.message} />
        )}
        <FormWrapper onSubmit={handleSubmit(onSubmit)} multipart>
          <div className="flex justify-center my-5">
            <div className="flex flex-col gap-10 lg:w-2/3">
              <Input
                id="hotel-name"
                title="Hotel name"
                defaultValue={settings?.hotelName}
              />
              <label htmlFor="" className="block -mb-8">
                Logo
              </label>
              <div className="flex items-center gap-10 flex-wrap">
                <Image
                  loader={() => file as string}
                  src={file as string}
                  alt="no image"
                  width="100"
                  height="100"
                />
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                />
              </div>
              <Input
                id="hotel-name"
                title="Country"
                defaultValue={settings?.country}
              />
              <Input
                id="hotel-name"
                title="Email"
                defaultValue={settings?.email}
              />
              <Input
                id="hotel-name"
                title="Phone number"
                defaultValue={settings?.phoneNumber}
              />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <SubmitButton name="Save" isLoading={isLoading} />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default GeneralSettingsPage;
