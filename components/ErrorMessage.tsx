import React from 'react';

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => (
  <p className="text-red-500 text-center text-lg">{errorMessage}</p>
);

export default ErrorMessage;
