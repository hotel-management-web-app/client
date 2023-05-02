import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockWrapper from '../../__mocks__/MockWrapper';
import Layout from '../../components/Layout';

describe('Layout', () => {
  it('Should render properly', () => {
    render(
      <MockWrapper>
        <Layout>
          <div>
            <p>Children</p>
          </div>
        </Layout>
      </MockWrapper>
    );

    const pElement = screen.getByText(/Children/i);

    expect(pElement).toBeInTheDocument();
  });
});
