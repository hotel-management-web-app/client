import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import EditableList from '../../../../components/Admin/Form/EditableList';

describe('EditableList', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <EditableList name="Amenities" />
      </MockWrapper>
    );

    const inputElement = screen.getByPlaceholderText(/Enter a value/i);

    expect(inputElement).toBeInTheDocument();
  });
});
