import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import Input from '../../../../components/Admin/Form/Input';

describe('Status Toggler', () => {
  it('Should render properly', () => {
    const title = 'Select Input';
    render(
      <MockWrapper>
        <Input title={title} />
      </MockWrapper>
    );

    const inputElement = screen.getByText(title);

    expect(inputElement).toBeInTheDocument();
  });
});
