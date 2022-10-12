import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import GuestStatusToggler from '../../../components/Admin/GuestStatusToggler';
import BackButton from '../../../components/Admin/BackButton';
import FormWrapper from '../../../components/Admin/FormWrapper';
import Header from '../../../components/Admin/Header';
import Input from '../../../components/Admin/Input';
import SubmitButton from '../../../components/Admin/SubmitButton';
import Textarea from '../../../components/Admin/Textarea';
import Seo from '../../../components/Seo';

const AddGuests = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = () => {};
  return (
    <div>
      <Seo title="Add Guest" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Add Guest" />
        <BackButton name="guests" url="/admin/guests" />
      </div>
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <GuestStatusToggler />
          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-10 mt-5">
            <Input id="first-name" title="First name" />
            <Input id="first-name" title="Last name" />
            <Input id="first-name" title="Email addres" />
            <Input id="first-name" title="Phone number" />
            <Input id="first-name" title="Country" />
            <Input id="first-name" title="Address" />
            <Input id="first-name" title="City" />
            <Input id="first-name" title="Postal Code" />
            <Textarea id="notes" title="Notes" rows="5" />
          </div>
          <div className="mt-5 flex justify-center">
            <SubmitButton name="Add guests" />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};
export default AddGuests;
