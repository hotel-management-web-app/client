import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { dehydrate, QueryClient } from 'react-query';
import {
  FormWrapper,
  Header,
  Input,
  SubmitButton,
} from '../../components/Admin';
import Error from '../../components/Error';
import ErrorMessage from '../../components/ErrorMessage';
import Seo from '../../components/Seo';
import { getProfileInfo } from '../../lib/api/profile';
import {
  useGetProfileInfo,
  useUpdateProfileInfo,
} from '../../lib/operations/profile';
import { profileSchema } from '../../lib/schemas';
import { ProfileInfo } from '../../lib/types';

interface ProfileProps {
  profileInfo: ProfileInfo;
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['profile-info'], getProfileInfo);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Profile: React.FC<ProfileProps> = () => {
  const methods = useForm<ProfileInfo>({
    resolver: yupResolver(profileSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const {
    data: profileInfo,
    isError: isProfileInfoError,
    error: profileInfoError,
  } = useGetProfileInfo();

  const {
    mutate,
    isLoading,
    isError: isMutationError,
    error: mutationError,
  } = useUpdateProfileInfo();

  const onSubmit: SubmitHandler<ProfileInfo> = (data) => {
    mutate(data);
  };

  const dateFormat = 'DD.MM.YYYY';

  if (isProfileInfoError) return <Error message={profileInfoError.message} />;

  return (
    <div>
      <Seo title="Profile" />
      <Header title="Profile" />
      <FormProvider {...methods}>
        {isMutationError && (
          <ErrorMessage errorMessage={mutationError.message} />
        )}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="w-4/5 sm:w-1/2 2xl:w-5/12 mx-auto my-5">
            <div className=" flex flex-col gap-5">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Registration date</p>
                  {profileInfo && (
                    <p>{moment(profileInfo?.createdAt).format(dateFormat)}</p>
                  )}
                </div>
                <div>
                  <p className="font-medium text-right">Last login</p>
                  {profileInfo && (
                    <p>{moment(profileInfo?.lastLogin).format(dateFormat)}</p>
                  )}
                </div>
              </div>
              <Input title="Name" defaultValue={profileInfo?.name} />
              <Input title="Email" defaultValue={profileInfo?.email} />
              <Input
                title="Phone number"
                defaultValue={profileInfo?.phoneNumber}
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
