import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
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
} from '../../../../components/Admin';
import Seo from '../../../../components/Seo';
import { Guest, ServerSideParams } from '../../../../lib/types';
import { useUpdateGuest } from '../../../../lib/operations/guests';
import { getGuest } from '../../../../lib/api/guests';
import { guestSchema } from '../../../../lib/schemas';
import { convertToOriginalForm } from '../../../../utils/convertToOriginalForm';
import { guestStatuses } from '../../../../constants/constants';

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
    resolver: yupResolver(guestSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;
  const { id } = router.query;
  const { mutate, isLoading } = useUpdateGuest(Number(id));

  const onSubmit: SubmitHandler<Guest> = (data) => {
    const convertedGuestStatus = convertToOriginalForm(
      guestStatuses,
      data.status
    );
    const updatedGuest = { ...data, status: convertedGuestStatus! };
    mutate(updatedGuest);
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
            defaultStatus={guestStatuses[guest.status] === 'Active'}
          />
          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-10 mt-5">
            <Input
              id="first-name"
              title="First name"
              defaultValue={guest.firstName}
            />
            <Input
              id="last-name"
              title="Last name"
              defaultValue={guest.lastName}
            />
            <Input
              id="email-address"
              title="Email address"
              fieldName="email"
              defaultValue={guest.email}
            />
            <Input
              id="phone-number"
              title="Phone number"
              defaultValue={guest.phoneNumber}
            />
            <Textarea
              id="notes"
              title="Notes"
              rows="5"
              defaultValue={guest.notes}
            />
          </div>
          <div className="mt-10 flex justify-center">
            <SubmitButton name="Update guest" isLoading={isLoading} />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default EditGuest;
