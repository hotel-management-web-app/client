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
import { guestStatuses } from '../../../constants/constants';
import { convertToOriginalForm } from '../../../utils/convertToOriginalForm';

const AddGuest = () => {
  const methods = useForm<Guest>({
    resolver: yupResolver(guestSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useAddGuest();

  const onSubmit: SubmitHandler<Guest> = (data) => {
    const convertedGuestStatus = convertToOriginalForm(
      guestStatuses,
      data.status
    );
    const guest = { ...data, status: convertedGuestStatus! };
    mutate(guest);
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
            <Input id="last-name" title="Last name" />
            <Input id="email-address" title="Email address" fieldName="email" />
            <Input id="phone-number" title="Phone number" />
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
