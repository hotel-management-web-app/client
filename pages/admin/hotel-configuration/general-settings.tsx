import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { FileUploader } from 'react-drag-drop-files';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import FormWrapper from '../../../components/Admin/FormWrapper';
import Header from '../../../components/Admin/Header';
import Seo from '../../../components/Seo';
import NoImage from '../../../public/images/no_image.jpg';
import Input from '../../../components/Admin/Input';
import { SubmitButton } from '../../../components/Admin';
import { getSettings } from '../../../lib/api/generalSettings';
import { useUpdateSettings } from '../../../lib/operations/generalSettings';
import { GeneralSettings } from '../../../lib/types';
import { generalSettingsSchema } from '../../../lib/schemas';

const fileTypes = ['JPG', 'PNG', 'GIF'];

interface GeneralSettingsPageProps {
  settings: GeneralSettings;
}

export const getServerSideProps = async () => {
  const settings = await getSettings();

  return { props: { settings } };
};

const GeneralSettingsPage: React.FC<GeneralSettingsPageProps> = ({
  settings,
}) => {
  const methods = useForm<GeneralSettings>({
    resolver: yupResolver(generalSettingsSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;
  const [file, setFile] = useState<StaticImageData | string>(NoImage);

  const { mutate, isLoading } = useUpdateSettings();

  const handleChange = (selectedFile: string) => {
    setFile(selectedFile);
  };

  const onSubmit: SubmitHandler<GeneralSettings> = (data) => {
    mutate(data);
  };
  return (
    <div>
      <Seo title="General settings" />
      <Header title="General settings" />
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center my-5">
            <div className="flex flex-col gap-10 lg:w-2/3">
              <Input
                id="hotel-name"
                title="Hotel name"
                defaultValue={settings.hotelName}
              />
              <label htmlFor="" className="block -mb-8">
                Logo
              </label>
              <div className="flex items-center gap-10 flex-wrap">
                <Image src={file} alt="no image" width="100" height="100" />
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                />
              </div>
              <Input
                id="hotel-name"
                title="Country"
                defaultValue={settings.country}
              />
              <Input
                id="hotel-name"
                title="Email"
                defaultValue={settings.email}
              />
              <Input
                id="hotel-name"
                title="Phone number"
                defaultValue={settings.phoneNumber}
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
