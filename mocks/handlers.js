import { rest } from 'msw';
import 'whatwg-fetch';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
import mockJobs from './data/jobs.json';
import mockProperties from './data/properties.json';
import mockBrands from './data/brands.json';

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/properties`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockProperties));
    },
  ),

  rest.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/jobs`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockJobs));
    },
  ),

  rest.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/brands`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockBrands));
    },
  ),

  rest.post(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/mailingList`,
    (req, res, ctx) => {
      return res(
        // Respond with a 200 status code
        ctx.status(200),
      );
    },
  ),
];
