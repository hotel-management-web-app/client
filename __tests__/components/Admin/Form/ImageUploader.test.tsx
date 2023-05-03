import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import ImageUploader from '../../../../components/Admin/Form/ImageUploader';

describe('Image Uploader', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <ImageUploader id="image" label="Image" />
      </MockWrapper>
    );

    const labelElement = screen.getByText('Image');

    expect(labelElement).toBeInTheDocument();
  });
});
