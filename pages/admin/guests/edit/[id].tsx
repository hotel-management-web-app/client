import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  StatusToggler,
  BackButton,
  FormWrapper,
  Header,
  Input,
  SubmitButton,
  Textarea,
} from '../../../../components/Admin';
import Seo from '../../../../components/Seo';
import { Guest, ServerSideParams } from '../../../../lib/types';
import { useUpdateGuest } from '../../../../lib/operations/guests';
import { getGuest } from '../../../../lib/api/guests';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  firstName: yup.string().required('First Name is required!'),
  lastName: yup.string().required('Last Name is required!'),
  emailAddress: yup
    .string()
    .email('Field should contain a valid e-mail')
    .required('Email address is required!'),
  phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid!'),
  country: yup.string(),
  address: yup.string(),
  city: yup.string(),
  postalCode: yup.string(),
  notes: yup.string(),
});

interface EditGuestProps {
  guest: Guest;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as ServerSideParams;
  const guest = await getGuest(Number(id));

  return { props: { guest } };
};

const EditGuest: React.FC<EditGuestProps> = ({ guest }) => {
  const router = useRouter();
  const methods = useForm<Guest>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;
  const { id } = router.query;
  const { mutate, isLoading } = useUpdateGuest(Number(id));

  const onSubmit: SubmitHandler<Guest> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <Seo title="Edit Guest" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Edit Guest" />
        <BackButton name="guests" url="/admin/guests" />
      </div>
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <StatusToggler
            id="status"
            label="Status"
            checkedValue="Active"
            uncheckedValue="Inactive"
            defaultStatus={guest.status === 'Active'}
          />
          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-10 mt-5">
            <Input
              id="first-name"
              title="First name"
              defaultValue={guest.firstName}
            />
            <Input
              id="first-name"
              title="Last name"
              defaultValue={guest.lastName}
            />
            <Input
              id="first-name"
              title="Email address"
              defaultValue={guest.emailAddress}
            />
            <Input
              id="first-name"
              title="Phone number"
              defaultValue={guest.phoneNumber}
            />
            <Input
              id="first-name"
              title="Country"
              defaultValue={guest.country}
            />
            <Input
              id="first-name"
              title="Address"
              defaultValue={guest.address}
            />
            <Input id="first-name" title="City" defaultValue={guest.city} />
            <Input
              id="first-name"
              title="Postal Code"
              defaultValue={guest.postalCode}
            />
            <Textarea
              id="notes"
              title="Notes"
              rows="5"
              defaultValue={guest.notes}
            />
          </div>
          <div className="mt-5 flex justify-center">
            <SubmitButton name="Edit guest" isLoading={isLoading} />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default EditGuest;
