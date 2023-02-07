import React from 'react';

interface FormWrapperProps {
  onSubmit: () => void;
  children: React.ReactNode;
  multipart?: boolean;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  onSubmit,
  children,
  multipart,
}) => (
  <form
    onSubmit={onSubmit}
    className="bg-white rounded-lg mt-10 px-10 pt-3 pb-7"
    {...(multipart ? { encType: 'multipart/form-data' } : {})}
  >
    {children}
  </form>
);
export default FormWrapper;
