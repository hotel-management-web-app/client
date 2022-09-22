import React, { useState } from 'react';
import Modal from 'react-modal';
import FormWrapper from './FormWrapper';
import SubmitButton from './SubmitButton';
import Textarea from './Textarea';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    padding: '0',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
};

const HousekeepingComments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Wash windows</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <FormWrapper>
          <form>
            <h2 className="text-center text-2xl pb-8 -mt-5">
              Comments and notes
            </h2>
            <Textarea id="comments" title="Enter comment..." rows={10} />
            <div className="flex justify-center mt-5">
              <SubmitButton name="Save" />
            </div>
          </form>
        </FormWrapper>
      </Modal>
    </div>
  );
};

export default HousekeepingComments;
