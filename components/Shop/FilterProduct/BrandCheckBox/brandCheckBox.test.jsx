import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../../../mocks/server.js';
import BrandCheckBox from '@/components/Shop/FilterProduct/BrandCheckBox';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('BrandCheckBox ', () => {
  beforeEach(() => {
    render(<BrandCheckBox />);
  });

  it('render "BrandCheckBox" Component', async () => {
    const textElement = await waitFor(() => screen.findByText(/brand/i));
    expect(textElement).toBeInTheDocument();
  });

  it('render Loading ', () => {
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('render all brands', async () => {
    expect(await screen.findByText(/umbro/i)).toBeInTheDocument();
  });

  // describe('Falied', () => {
  //   it('handle fail', async () => {
  //     server.use(
  //       rest.get(
  //         `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/brands`,
  //         (req, res, ctx) => {
  //           return res(ctx.status(404));
  //         },
  //       ),
  //     );
  //     const { findByText } = render(<BrandCheckBox />);

  //     expect(await findByText('Could not fetch brands')).toBeInTheDocument();
  //   });
  // });
});
