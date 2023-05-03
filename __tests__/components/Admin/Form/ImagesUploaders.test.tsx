import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import ImagesUploader from '../../../../components/Admin/Form/ImagesUploader';

describe('Images Uploader', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <ImagesUploader />
      </MockWrapper>
    );

    const divElement = screen.getByTestId('images-uploader');

    expect(divElement).toBeInTheDocument();
  });
});
