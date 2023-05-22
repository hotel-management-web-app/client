import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormWrapper, Input, SubmitButton } from '../components/Admin';
import { useLogin } from '../lib/operations/auth';
import { loginSchema } from '../lib/schemas';
import { LoginForm } from '../lib/types';

const Login = () => {
  const methods = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const { mutate, isLoading } = useLogin();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    mutate(data);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <FormProvider {...methods}>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
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
              <a href="#" className="text-xs text-purple-600 hover:underline">
                Forget Password?
              </a>
            </div>
            <div className="mt-6">
              <SubmitButton name="Login" isLoading={isLoading} />
            </div>
          </FormWrapper>
        </FormProvider>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don&apos;t have an account?
          <a href="#" className="font-medium text-purple-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
