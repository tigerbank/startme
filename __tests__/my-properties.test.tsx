import React from 'react';
import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import MyProperties from '@/pages/my-properties';
import mockProperties from '../data/properties.json';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const server = setupServer(
  rest.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/properties`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockProperties));
    },
  ),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('My-properties component', () => {
  it('should render component', () => {
    render(<MyProperties />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('correctly fetch data', async () => {
    const { findByText, findAllByRole } = render(<MyProperties />);
    const text = await findByText('manchester');
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
