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
import { userSchema } from '../../../lib/schemas';
import { User } from '../../../lib/types';

const AddUser = () => {
  const methods = useForm<User>({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Seo title="Add User" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Add User" />
        <BackButton name="users" url="/admin/users" />
      </div>
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 px-96 py-5">
            <Input id="name" title="Name" />
            <Input id="email" title="Email" />
            <Input
              id="phone-number"
              title="Phone number"
              fieldName="phoneNumber"
            />
            <Input id="password" title="Password" />
            <Input
              id="confirm-password"
              title="Confirm Password"
              fieldName="confirmPassword"
            />
            <div className="w-40 mt-5 mx-auto">
              <SubmitButton name="Add user" isLoading={false} />
            </div>
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default AddUser;
