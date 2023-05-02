import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import SelectInput from '../../../../components/Admin/Form/SelectInput';

describe('Status Toggler', () => {
  it('Should render properly', () => {
    const title = 'Select Input';
    render(
      <MockWrapper>
        <SelectInput id="select-input" title={title} />
      </MockWrapper>
    );

    const inputElement = screen.getByText(title);

    expect(inputElement).toBeInTheDocument();
  });
});
