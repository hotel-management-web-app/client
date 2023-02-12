import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { contactSchema } from '../lib/schemas';
import { ContactFormInputs } from '../lib/types';
import ContactInput from './ContactInput';

const ContactForm = () => {
  const methods = useForm<ContactFormInputs>({
    resolver: yupResolver(contactSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<ContactFormInputs> = (data) =>
    console.log(data);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="#"
        className="flex flex-col gap-5 mt-10"
      >
        <div className="grid grid-cols-2 gap-5">
          <ContactInput placeholder="First Name" fieldName="firstName" />
          <ContactInput placeholder="Second Name" fieldName="secondName" />
          <ContactInput placeholder="Email" fieldName="email" />
          <ContactInput placeholder="Phone" fieldName="phoneNumber" />
        </div>
        <ContactInput placeholder="Subject" fieldName="subject" />
        <ContactInput
          placeholder="Message"
          textarea
          rows={8}
          fieldName="message"
        />
        <button className="bg-black text-white w-64 py-3 font-medium text-lg mx-auto mt-5">
          Send
        </button>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
