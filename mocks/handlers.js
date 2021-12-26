import { rest } from 'msw';
import 'whatwg-fetch';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
import mockProperties from '../data/properties.json';

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/properties`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockProperties));
    },
  ),
];
