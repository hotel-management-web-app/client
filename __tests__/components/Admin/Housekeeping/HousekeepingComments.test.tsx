import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import HousekeepingComments from '../../../../components/Admin/Housekeeping/HousekeepingComments';

describe('HousekeepingComments', () => {
  it('Should render properly', () => {
    const comment = 'Comment';
    render(
      <MockWrapper>
        <HousekeepingComments id={1} value={comment} />
      </MockWrapper>
    );

    const commentText = screen.getByText(comment);

    expect(commentText).toBeInTheDocument();
  });
});
