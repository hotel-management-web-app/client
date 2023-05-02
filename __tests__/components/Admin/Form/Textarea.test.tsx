import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import Textarea from '../../../../components/Admin/Form/Textarea';

describe('Textarea', () => {
  it('Should render properly', () => {
    const placeholder = 'Textarea';
    render(
      <MockWrapper>
        <Textarea id="textarea" title={placeholder} placeholder={placeholder} />
      </MockWrapper>
    );

    const buttonElement = screen.getByPlaceholderText(placeholder);

    expect(buttonElement).toBeInTheDocument();
  });
});
