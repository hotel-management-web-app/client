import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  StatusToggler,
  BackButton,
  FormWrapper,
  Header,
  Input,
  SubmitButton,
  Textarea,
} from '../../../components/Admin';
import Seo from '../../../components/Seo';
import { Guest } from '../../../lib/types';
import { useAddGuest } from '../../../lib/operations/guests';
import { guestSchema } from '../../../lib/schemas';

const AddGuest = () => {
  const methods = useForm<Guest>({
    resolver: yupResolver(guestSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useAddGuest();

  const onSubmit: SubmitHandler<Guest> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <Seo title="Add Guest" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Add Guest" />
        <BackButton name="guests" url="/admin/guests" />
      </div>
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <StatusToggler
            id="status"
            label="Status"
            checkedValue="Active"
            uncheckedValue="Inactive"
          />
          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-10 mt-5">
            <Input id="first-name" title="First name" />
            <Input id="first-name" title="Last name" />
            <Input id="first-name" title="Email address" />
            <Input id="first-name" title="Phone number" />
            <Input id="first-name" title="Country" />
            <Input id="first-name" title="Address" />
            <Input id="first-name" title="City" />
            <Input id="first-name" title="Postal Code" />
            <Textarea id="notes" title="Notes" rows="5" />
          </div>
          <div className="mt-5 flex justify-center">
            <SubmitButton name="Add guest" isLoading={isLoading} />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default AddGuest;
