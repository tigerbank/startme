import React from 'react';
import { axiosJobsData, getCompanies } from '@/util/api';

import mockAxios from 'axios';

jest.mock('axios');

const company = [
  {
    id: 1,
    name: 'Kasisto',
    locale: 'th',
    published_at: '2021-12-09T07:15:31.683Z',
    created_at: '2021-12-09T07:15:29.479Z',
    updated_at: '2021-12-09T07:15:31.700Z',
    logo: null,
    localizations: [],
  },
  {
    id: 2,
    name: 'Lev',
    locale: 'th',
    published_at: '2021-12-09T07:15:40.986Z',
    created_at: '2021-12-09T07:15:39.137Z',
    updated_at: '2021-12-09T07:15:41.006Z',
    logo: null,
    localizations: [],
  },
  {
    id: 3,
    name: 'Facebook',
    locale: 'th',
    published_at: '2021-12-09T07:15:52.061Z',
    created_at: '2021-12-09T07:15:50.234Z',
    updated_at: '2021-12-09T07:15:52.080Z',
    logo: null,
    localizations: [],
  },
];

const jobs = [
  {
    id: 1,
    position: 'Frontend Developer (Reactjs)',
    type: 'fulltime',
    company: {
      id: 1,
      name: 'Kasisto',
      locale: 'th',
      published_at: '2021-12-09T07:15:31.683Z',
      created_at: '2021-12-09T07:15:29.479Z',
      updated_at: '2021-12-09T07:15:31.700Z',
      logo: null,
    },
    location: {
      id: 1,
      name: 'Bangkok',
      locale: 'th',
      published_at: '2021-12-13T06:35:06.520Z',
      created_at: '2021-12-13T06:35:03.914Z',
      updated_at: '2021-12-13T06:35:06.533Z',
    },
    locale: 'th',
    published_at: '2021-12-09T07:17:45.645Z',
    created_at: '2021-12-09T07:17:40.129Z',
    updated_at: '2021-12-13T06:42:08.894Z',
    localizations: [],
  },
  {
    id: 2,
    position: 'Project Manager',
    type: 'parttime',
    company: {
      id: 2,
      name: 'Lev',
      locale: 'th',
      published_at: '2021-12-09T07:15:40.986Z',
      created_at: '2021-12-09T07:15:39.137Z',
      updated_at: '2021-12-09T07:15:41.006Z',
      logo: null,
    },
    location: {
      id: 2,
      name: 'Singapore',
      locale: 'th',
      published_at: '2021-12-13T06:35:19.751Z',
      created_at: '2021-12-13T06:35:17.506Z',
      updated_at: '2021-12-13T06:35:19.769Z',
    },
    locale: 'th',
    published_at: '2021-12-09T07:18:02.212Z',
    created_at: '2021-12-09T07:17:59.752Z',
    updated_at: '2021-12-13T06:42:34.150Z',
    localizations: [],
  },
  {
    id: 3,
    position: 'Frontend Developer',
    type: 'fulltime',
    company: {
      id: 3,
      name: 'Facebook',
      locale: 'th',
      published_at: '2021-12-09T07:15:52.061Z',
      created_at: '2021-12-09T07:15:50.234Z',
      updated_at: '2021-12-09T07:15:52.080Z',
      logo: null,
    },
    location: {
      id: 3,
      name: 'California',
      locale: 'th',
      published_at: '2021-12-13T06:35:41.911Z',
      created_at: '2021-12-13T06:35:39.935Z',
      updated_at: '2021-12-13T06:35:41.928Z',
    },
    locale: 'th',
    published_at: '2021-12-09T08:24:56.149Z',
    created_at: '2021-12-09T08:24:54.254Z',
    updated_at: '2021-12-13T06:42:41.802Z',
    localizations: [],
  },
  {
    id: 4,
    position: 'Software engineer',
    type: 'fulltime',
    company: {
      id: 3,
      name: 'Facebook',
      locale: 'th',
      published_at: '2021-12-09T07:15:52.061Z',
      created_at: '2021-12-09T07:15:50.234Z',
      updated_at: '2021-12-09T07:15:52.080Z',
      logo: null,
    },
    location: {
      id: 1,
      name: 'Bangkok',
      locale: 'th',
      published_at: '2021-12-13T06:35:06.520Z',
      created_at: '2021-12-13T06:35:03.914Z',
      updated_at: '2021-12-13T06:35:06.533Z',
    },
    locale: 'th',
    published_at: '2021-12-09T08:25:16.709Z',
    created_at: '2021-12-09T08:25:14.527Z',
    updated_at: '2021-12-13T06:42:48.780Z',
    localizations: [],
  },
  {
    id: 5,
    position: 'Senior Software engineer',
    type: 'fulltime',
    company: {
      id: 2,
      name: 'Lev',
      locale: 'th',
      published_at: '2021-12-09T07:15:40.986Z',
      created_at: '2021-12-09T07:15:39.137Z',
      updated_at: '2021-12-09T07:15:41.006Z',
      logo: null,
    },
    location: {
      id: 2,
      name: 'Singapore',
      locale: 'th',
      published_at: '2021-12-13T06:35:19.751Z',
      created_at: '2021-12-13T06:35:17.506Z',
      updated_at: '2021-12-13T06:35:19.769Z',
    },
    locale: 'th',
    published_at: '2021-12-09T08:25:39.748Z',
    created_at: '2021-12-09T08:25:37.761Z',
    updated_at: '2021-12-13T06:42:56.383Z',
    localizations: [],
  },
];

describe('Backend Filtering Jobs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return job title', async () => {
    mockAxios.get.mockResolvedValue({
      data: jobs,
    });

    const data = await axiosJobsData({
      s: '',
      company: '',
      city: '',
      perPage: '',
    });
    expect(data.length).toBeGreaterThan(0);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it('should return company ', async () => {
    mockAxios.get.mockResolvedValue({
      data: company,
    });

    const data = await getCompanies();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].name).toBe('Kasisto');
  });
});
