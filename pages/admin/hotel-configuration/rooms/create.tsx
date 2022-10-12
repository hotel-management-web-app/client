import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Seo from '../../../../components/Seo';
import BackButton from '../../../../components/Admin/BackButton';
import Header from '../../../../components/Admin/Header';
import SubmitButton from '../../../../components/Admin/SubmitButton';
import FormWrapper from '../../../../components/Admin/FormWrapper';
import Input from '../../../../components/Admin/Input';
import SelectInput from '../../../../components/Admin/SelectInput';

const roomTypeOptions = [
  { value: 'apartment', label: 'Apartament' },
  { value: 'double-room', label: 'Double room' },
  { value: 'family-room', label: 'Family room' },
  { value: 'single-room', label: 'Single room' },
];

const AddRoom = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = () => {};

  return (
    <div>
      <Seo title="Add Room" />
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Add room" />
        <BackButton name="rooms" url="/admin/hotel-configuration/rooms/" />
      </div>
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto w-11/12 lg:w-3/4 py-5">
            <div className="flex flex-col gap-5">
              <SelectInput
                id="room-type"
                title="Room type"
                options={roomTypeOptions}
              />
              <Input
                id="room-floor-number"
                title="Floor number"
                type="number"
                min="0"
              />
              <Input
                id="room-number"
                title="Room number"
                type="number"
                min="0"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <SubmitButton name="Add room" />
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default AddRoom;
