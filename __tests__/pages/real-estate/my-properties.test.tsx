import React from 'react';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../../mocks/server.js';
import MyProperties from '@/pages/my-properties';

describe('My-properties component', () => {
  it('should render component', () => {
    render(<MyProperties />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('correctly fetch data', async () => {
    const { findByText, findAllByRole } = render(<MyProperties />);
    const text = await findByText(/Kent Street/i);
    expect(text).toBeInTheDocument();

    const heading = await findAllByRole('heading');
    expect(heading.length).toBe(7);
  });

  it('handle fail', async () => {
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/properties`,
        (req, res, ctx) => {
          return res(ctx.status(404));
        },
      ),
    );
    const { findByText } = render(<MyProperties />);
    expect(await findByText('Could not fetch properties')).toBeInTheDocument();
  });
});
