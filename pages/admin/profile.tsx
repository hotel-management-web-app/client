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
import { getProfileInfo } from '../../lib/api/profile';
import { useUpdateProfileInfo } from '../../lib/operations/profile';
import { profileSchema } from '../../lib/schemas';
import { ProfileInfo } from '../../lib/types';

interface ProfileProps {
  profileInfo: ProfileInfo;
}

export const getServerSideProps = async () => {
  const profileInfo = await getProfileInfo();

  return { props: { profileInfo } };
};

const Profile: React.FC<ProfileProps> = ({ profileInfo }) => {
  const methods = useForm<ProfileInfo>({
    resolver: yupResolver(profileSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useUpdateProfileInfo();

  const onSubmit: SubmitHandler<ProfileInfo> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <Seo title="Profile" />
      <Header title="Profile" />
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="w-4/5 sm:w-1/2 2xl:w-5/12 mx-auto my-5">
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
              <Input title="Name" defaultValue={profileInfo.name} />
              <Input title="Email" defaultValue={profileInfo.email} />
              <Input
                title="Phone number"
                defaultValue={profileInfo.phoneNumber}
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <SubmitButton isLoading={isLoading} />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default Profile;
