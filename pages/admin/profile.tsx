import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import {
  FormWrapper,
  Header,
  Input,
  SubmitButton,
} from '../../components/Admin';
import Seo from '../../components/Seo';
import { profileSchema } from '../../lib/schemas';
import { GeneralSettings } from '../../lib/types';

const Profile = () => {
  const methods = useForm<GeneralSettings>({
    resolver: yupResolver(profileSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<GeneralSettings> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Seo title="Profile" />
      <Header title="Profile" />
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="w-1/2 2xl:w-5/12 mx-auto my-5">
            <div className=" flex flex-col gap-5">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Registration date</p>
                  <p>26.10.2022</p>
                </div>
                <div>
                  <p className="font-medium text-right">Last login</p>
                  <p>26.10.2022</p>
                </div>
              </div>
              <Input title="Name" />
              <Input title="Email" />
              <Input title="Phone number" />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <SubmitButton />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default Profile;
