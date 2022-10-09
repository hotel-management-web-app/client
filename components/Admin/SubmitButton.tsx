import React from 'react';
import { TailSpin } from 'react-loader-spinner';

interface SubmitButtonProps {
  name: string;
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  name,
  isLoading = false,
}) => (
  <button className="bg-black text-white px-3 py-2 rounded-lg w-48 relative">
    {isLoading && (
      <TailSpin
        height="20"
        width="20"
        color="#ccc"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{
          display: 'inline',
          position: 'absolute',
          left: '11px',
        }}
        visible
      />
    )}
    {name}
  </button>
);

export default SubmitButton;
