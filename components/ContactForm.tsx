import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { TailSpin } from 'react-loader-spinner';
import { useSendMail } from '../lib/operations/contact';
import { contactSchema } from '../lib/schemas';
import { ContactFormInputs } from '../lib/types';
import ContactInput from './ContactInput';
import ErrorMessage from './ErrorMessage';

const ContactForm = () => {
  const methods = useForm<ContactFormInputs>({
    resolver: yupResolver(contactSchema),
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading, isError, error } = useSendMail();

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => mutate(data);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="#"
        className="flex flex-col gap-5 mt-10"
        data-testid="contact-form"
      >
        {isError && <ErrorMessage errorMessage={error.message} />}
        <div className="grid grid-cols-2 gap-5">
          <ContactInput
            id="first-name"
            placeholder="First Name"
            fieldName="firstName"
          />
          <ContactInput
            id="second-name"
            placeholder="Second Name"
            fieldName="secondName"
          />
          <ContactInput id="email" placeholder="Email" fieldName="email" />
          <ContactInput
            id="phone-number"
            placeholder="Phone"
            fieldName="phoneNumber"
          />
        </div>
        <ContactInput id="subject" placeholder="Subject" fieldName="subject" />
        <ContactInput
          id="message"
          placeholder="Message"
          textarea
          rows={8}
          fieldName="message"
        />
        <button
          className="bg-black text-white w-64 py-3 font-medium text-lg mx-auto mt-5 relative"
          disabled={isLoading}
        >
          {isLoading && (
            <TailSpin
              height="30"
              width="30"
              color="#ccc"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{
                display: 'inline',
                position: 'absolute',
                left: '11px',
              }}
              visible
            />
          )}
          Send
        </button>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
