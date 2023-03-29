import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { dehydrate, QueryClient } from 'react-query';
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
import ErrorMessage from '../../../../components/ErrorMessage';
import Error from '../../../../components/Error';
import { Guest, ServerSideParams } from '../../../../lib/types';
import { useGetGuest, useUpdateGuest } from '../../../../lib/operations/guests';
import { getGuest } from '../../../../lib/api/guests';
import { guestSchema } from '../../../../lib/schemas';
import { convertToOriginalForm } from '../../../../utils/convertToOriginalForm';
import { guestStatuses } from '../../../../constants/constants';

interface EditGuestProps {
  guest: Guest;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as ServerSideParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['rooms'], () => getGuest(Number(id)));

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const EditGuest: React.FC<EditGuestProps> = () => {
  const router = useRouter();
  const methods = useForm<Guest>({
    resolver: yupResolver(guestSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { id } = router.query;
  const {
    data: guest,
    isError: isGuestError,
    error: guestError,
  } = useGetGuest(Number(id));
  const { mutate, isLoading, isError, error } = useUpdateGuest(Number(id));

  const onSubmit: SubmitHandler<Guest> = (data) => {
    const convertedGuestStatus = convertToOriginalForm(
      guestStatuses,
      data.status
    );
    const updatedGuest = { ...data, status: convertedGuestStatus! };
    mutate(updatedGuest);
  };

  if (isGuestError) return <Error message={guestError.message} />;

  return (
    <div>
      <Seo title="Edit Guest" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Edit Guest" />
        <BackButton name="guests" url="/admin/guests" />
      </div>
      <FormProvider {...methods}>
        {isError && <ErrorMessage errorMessage={error.message} />}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <StatusToggler
            id="status"
            label="Status"
            checkedValue="Active"
            uncheckedValue="Inactive"
            defaultStatus={guestStatuses[guest?.status!] === 'Active'}
          />
          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-10 mt-5">
            <Input
              id="first-name"
              title="First name"
              defaultValue={guest?.firstName}
            />
            <Input
              id="last-name"
              title="Last name"
              defaultValue={guest?.lastName}
            />
            <Input
              id="email-address"
              title="Email address"
              fieldName="email"
              defaultValue={guest?.email}
            />
            <Input
              id="phone-number"
              title="Phone number"
              defaultValue={guest?.phoneNumber}
            />
            <Textarea
              id="notes"
              title="Notes"
              rows="5"
              defaultValue={guest?.notes}
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
