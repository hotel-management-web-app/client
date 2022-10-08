import React from 'react';

interface FormWrapperProps {
  onSubmit: () => void;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ onSubmit, children }) => (
  <form
    onSubmit={onSubmit}
    className="bg-white rounded-lg mt-10 px-10 pt-3 pb-7"
  >
    {children}
  </form>
);
export default FormWrapper;
