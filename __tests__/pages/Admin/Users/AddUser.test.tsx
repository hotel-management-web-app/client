import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../../../__mocks__/MockWrapper';
import AddUser from '../../../../pages/admin/users/create';

describe('AddUser', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <AddUser />
      </MockWrapper>
    );

    const headingElement = screen.getByRole('heading', {
      name: /Add user/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
