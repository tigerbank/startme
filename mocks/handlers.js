import { rest } from 'msw';
import 'whatwg-fetch';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
import mockJobs from './data/jobs.json';
import mockProperties from './data/properties.json';
import mockBrands from './data/brands.json';
import mockProducts from './data/products.json';
import mockCompanies from './data/companies.json';
import mockLocations from './data/locations.json';

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

  rest.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockProducts));
    },
  ),

  rest.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/companies`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockCompanies));
    },
  ),

  rest.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/cities`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockLocations));
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
