import React from 'react';

interface FormWrapperProps {
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => (
  <form className="bg-white rounded-lg mt-10 px-10 pt-3 pb-7">{children}</form>
);
export default FormWrapper;
