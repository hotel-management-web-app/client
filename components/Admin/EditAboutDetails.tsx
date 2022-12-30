import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { yupResolver } from '@hookform/resolvers/yup';
import customStyles from '../../styles/modalStyles';
import SubmitButton from './SubmitButton';
import Textarea from './Textarea';
import Input from './Input';
import FormWrapper from './FormWrapper';
import { useUpdateAboutDetail } from '../../lib/operations/about';
import { AboutDetail } from '../../lib/types';
import { aboutDetailSchema } from '../../lib/schemas';
import ImageUploader from './ImageUploader';

interface EditAboutDetailsProps {
  aboutDetail: AboutDetail;
}

const EditAboutDetails: React.FC<EditAboutDetailsProps> = ({ aboutDetail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm<AboutDetail>({
    resolver: yupResolver(aboutDetailSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading, isError } = useUpdateAboutDetail(aboutDetail.id);

  const onSubmit: SubmitHandler<AboutDetail> = async (data) => {
    const { title, description } = data;
    const form = new FormData();
    form.append('data', JSON.stringify({ title, description }));
    if (data.image) form.append('image', data.image);

    mutate(form);
    if (!isError) {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <button
        className="text-white bg-green-500 px-5 py-1 rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        Edit
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <FormProvider {...methods}>
          <FormWrapper onSubmit={handleSubmit(onSubmit)} multipart>
            <h2 className="text-center text-2xl pb-8 -mt-5">
              Edit about detail
            </h2>
            <div className="mb-5">
              <ImageUploader
                id="about-image"
                label="Image"
                width={200}
                defaultImage={aboutDetail.image}
                loader
              />
            </div>
            <Input defaultValue={aboutDetail.title} />
            <div className="mt-5">
              <Textarea
                id="description"
                title="Description"
                rows={10}
                defaultValue={aboutDetail.description}
              />
            </div>
            <div className="flex justify-center mt-5">
              <SubmitButton name="Update" isLoading={isLoading} />
            </div>
          </FormWrapper>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default EditAboutDetails;
