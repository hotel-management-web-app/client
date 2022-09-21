import React from 'react';

interface FormWrapperProps {
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => (
  <div className="bg-white rounded-lg mt-10 px-10 pt-3 pb-7">{children}</div>
);
export default FormWrapper;
