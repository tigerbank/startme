import React from 'react';
import {
  render,
  screen,
  waitFor,
  wait,
  waitForElement,
} from '@testing-library/react';
import { axiosJobsData } from '@/util/api';

import mockAxios from 'axios';

jest.mock('axios');

mockAxios.get.mockResolvedValue({
  data: [
    {
      id: 1,
      position: 'Frontend Developer (Reactjs)',
      type: 'fulltime',
      city: 'Bangkok',
      company: {
        id: 1,
        name: 'Kasisto',
        locale: 'th',
        published_at: '2021-12-09T07:15:31.683Z',
        created_at: '2021-12-09T07:15:29.479Z',
        updated_at: '2021-12-09T07:15:31.700Z',
        logo: null,
      },
      locale: 'th',
      published_at: '2021-12-09T07:17:45.645Z',
      created_at: '2021-12-09T07:17:40.129Z',
      updated_at: '2021-12-09T07:17:45.663Z',
      localizations: [],
    },
    {
      id: 2,
      position: 'Frontend Developer (Reactjs)',
      type: 'fulltime',
      city: 'Bangkok',
      company: {
        id: 1,
        name: 'Kasisto',
        locale: 'th',
        published_at: '2021-12-09T07:15:31.683Z',
        created_at: '2021-12-09T07:15:29.479Z',
        updated_at: '2021-12-09T07:15:31.700Z',
        logo: null,
      },
      locale: 'th',
      published_at: '2021-12-09T07:17:45.645Z',
      created_at: '2021-12-09T07:17:40.129Z',
      updated_at: '2021-12-09T07:17:45.663Z',
      localizations: [],
    },
  ],
});

describe('BackendJobs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return job title', async () => {
    const data = await axiosJobsData();
    expect(data.length).toBeGreaterThan(0);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});
