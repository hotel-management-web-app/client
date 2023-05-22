import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Seo from '../../../components/Seo';
import {
  BackButton,
  FormWrapper,
  Header,
  Input,
  SubmitButton,
} from '../../../components/Admin';
import ErrorMessage from '../../../components/ErrorMessage';
import { registerSchema } from '../../../lib/schemas';
import { User } from '../../../lib/types';
import { useRegister } from '../../../lib/operations/auth';

const AddUser = () => {
  const methods = useForm<User>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading, isError, error } = useRegister();

  const onSubmit: SubmitHandler<User> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <Seo title="Add User" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Add User" />
        <BackButton name="users" url="/admin/users" />
      </div>
      <FormProvider {...methods}>
        {isError && <ErrorMessage errorMessage={error.message} />}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 px-96 py-5">
            <Input id="name" title="Name" />
            <Input id="email" title="Email" />
            <Input
              id="phone-number"
              title="Phone number"
              fieldName="phoneNumber"
            />
            <Input id="password" title="Password" type="password" />
            <Input
              id="confirm-password"
              title="Confirm Password"
              fieldName="confirmPassword"
              type="password"
            />
            <div className="w-40 mt-5 mx-auto">
              <SubmitButton name="Add user" isLoading={isLoading} />
            </div>
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default AddUser;
