import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate } from 'react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import Seo from '../../../../components/Seo';
import {
  BackButton,
  FormWrapper,
  Header,
  Input,
  SubmitButton,
} from '../../../../components/Admin';
import ErrorMessage from '../../../../components/ErrorMessage';
import { userSchema } from '../../../../lib/schemas';
import { useGetUser, useUpdateUser } from '../../../../lib/operations/user';
import { getUser } from '../../../../lib/api/user';
import { ServerSideParams, User } from '../../../../lib/types';
import PhoneNumberInput from '../../../../components/Admin/Form/PhoneNumberInput';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as ServerSideParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['users'], () => getUser(Number(id)));

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const EditUser = () => {
  const router = useRouter();
  const methods = useForm<User>({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const { id } = router.query;
  const { data: user, isSuccess } = useGetUser(Number(id));

  const { mutate, isLoading, isError, error } = useUpdateUser(Number(id));

  const onSubmit: SubmitHandler<User> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <Seo title="Edit User" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Edit User" />
        <BackButton name="users" url="/admin/users" />
      </div>
      <FormProvider {...methods}>
        {isError && <ErrorMessage errorMessage={error.message} />}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 px-96 py-5">
            <Input id="name" title="Name" defaultValue={user?.name} />
            <Input id="email" title="Email" defaultValue={user?.email} />
            {isSuccess && (
              <div className="relative">
                <PhoneNumberInput
                  control={control}
                  defaultValue={formatPhoneNumberIntl(
                    user.phoneNumber as string
                  )}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm absolute">
                    {errors.phoneNumber.message as string}
                  </p>
                )}
              </div>
            )}

            <div className="w-48 mt-5 mx-auto">
              <SubmitButton name="Update user" isLoading={isLoading} />
            </div>
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default EditUser;
