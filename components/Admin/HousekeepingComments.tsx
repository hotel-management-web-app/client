import React, { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import Modal from 'react-modal';
import { useUpdateRoomField } from '../../lib/operations/rooms';
import { StatusesProps } from '../../lib/types';
import FormWrapper from './FormWrapper';
import SubmitButton from './SubmitButton';
import Textarea from './Textarea';
import customStyles from '../../styles/modalStyles';

interface HousekeepingCommentsProps {
  id: number;
  value?: string;
}

const HousekeepingComments: React.FC<HousekeepingCommentsProps> = ({
  id,
  value = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState<string>(value);
  const methods = useForm<StatusesProps>();
  const { handleSubmit } = methods;
  const { mutate, isLoading } = useUpdateRoomField(id);

  const onSubmit: SubmitHandler<StatusesProps> = (data) => {
    mutate(data);
    setComments(data.comments);
    setIsModalOpen(false);
  };
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>{comments}</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <FormProvider {...methods}>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center text-2xl pb-8 -mt-5">
              Comments and notes
            </h2>
            <Textarea
              id="comments"
              title="Enter comment..."
              defaultValue={value}
              fieldName="comments"
              rows={10}
            />
            <div className="flex justify-center mt-5">
              <SubmitButton name="Save" isLoading={isLoading} />
            </div>
          </FormWrapper>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default HousekeepingComments;
