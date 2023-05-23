import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormWrapper, Input, SubmitButton } from '../components/Admin';
import { useLogin } from '../lib/operations/auth';
import { loginSchema } from '../lib/schemas';
import { LoginForm } from '../lib/types';
import Seo from '../components/Seo';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {
  const methods = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const { mutate, isLoading, isError, error } = useLogin();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    mutate(data);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-[#F3F5F7]">
      <Seo title="Login" />
      <div className="w-full p-6 m-auto bg-white rounded-xl shadow-lg lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center underline">
          Sign in
        </h1>
        <FormProvider {...methods}>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            {isError && (
              <ErrorMessage errorMessage={error?.response?.data?.message} />
            )}
            <div className="flex flex-col gap-5">
              <Input
                id="email"
                title="Email"
                defaultValue="admin@example.com"
              />
              <Input
                id="password"
                title="Password"
                type="password"
                defaultValue="password"
              />
              <a href="#" className="text-xs hover:underline">
                Forget Password?
              </a>
            </div>
            <div className="mt-6 mx-auto">
              <SubmitButton name="Login" isLoading={isLoading} />
            </div>
          </FormWrapper>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
