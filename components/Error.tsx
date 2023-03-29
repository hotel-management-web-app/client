import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => (
  <div>
    <h2 className="text-red-500 text-5xl text-center mt-40">Error!</h2>
    <p className="text-red-500 text-2xl text-center mt-10">{message}</p>
  </div>
);

export default Error;
