import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsPlusLg } from 'react-icons/bs';
import customStyles from '../../styles/modalStyles';
import SubmitButton from './SubmitButton';
import Textarea from './Textarea';
import Input from './Input';
import FormWrapper from './FormWrapper';
import { useAddAboutDetail } from '../../lib/operations/about';
import { AboutDetail } from '../../lib/types';
import { aboutDetailSchema } from '../../lib/schemas';

const AddAboutDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm<AboutDetail>({
    resolver: yupResolver(aboutDetailSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useAddAboutDetail();
  const router = useRouter();

  const onSubmit: SubmitHandler<AboutDetail> = (data) => {
    setIsModalOpen(false);
    mutate(data);
    router.replace(router.asPath);
  };

  return (
    <div>
      <button
        className="text-white bg-black px-5 py-2 rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <BsPlusLg className="inline mb-1 mr-3" />
        Add about detail
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <FormProvider {...methods}>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center text-2xl pb-8 -mt-5">
              Add about detail
            </h2>
            <Input />
            <div className="mt-5">
              <Textarea id="description" title="Description" rows={10} />
            </div>
            <div className="flex justify-center mt-5">
              <SubmitButton name="Save" isLoading={isLoading} />
            </div>
          </FormWrapper>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default AddAboutDetails;
