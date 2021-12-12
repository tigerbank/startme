import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Jobs from '@/pages/jobs';

describe('jobs', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          id: 1,
          position: 'Frontend Developer (Reactjs)',
          type: 'fulltime',
          city: 'ss',
          company: {
            id: 1,
            name: 'Cupertino',
            logo: null,
          },
          updated_at: '2021-12-09T07:17:45.663Z',
        },
        {
          id: 2,
          position: 'Project Manager',
          type: 'parttime',
          city: 'Cupertino',
          company: {
            id: 2,
            name: 'Lev',
            logo: null,
          },
          updated_at: '2021-12-09T07:18:02.258Z',
        },
      ]),
    );
  });

  it('render "Search" as a text', async () => {
    const { findByText } = render(<Jobs />);
    const textElement = await findByText(/Search/i);
    expect(textElement).toBeInTheDocument();
  });

  it('calls Api and returns data to me', async () => {
    const { findAllByText } = render(<Jobs />);
    const element = await findAllByText(/Cupertino/i);
    expect(element[0]).toBeInTheDocument();
  });
});
