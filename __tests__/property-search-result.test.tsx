import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import PropertySearchResult from '@/pages/real-estate/property-search-result';
import mockAxios from 'axios';
jest.mock('axios');

const properties = [
  {
    id: 1,
    name: '38/515 Kent Street, Sydney',
    property_slug: 'kent-street',
    type: 'apartment',
    listType: 'rent',
    address: '38/515 Kent Street, Sydney',
    price: 1200000,
    shortDetail:
      'Offering an exceptional opportunity to obtain this stunning apartment filled with natural light, here you can enjoy the vigour of the top-notch, urban lifestyle that Sydney CBD offers. Delightfully located in a secure building, this property is positioned to experience a privileged and private way of life, with luxury resort style recreational facilities, including a heated swimming pool, sauna, spa, and a gymnasium within the complex',
    fullDetail:
      'Showcasing two double bedrooms, both w/ built-ins, and a contemporary open plan living/dining area, this property is perfect for an inner-city home or an investment opportunity.',
    bedRoom: '2',
    bathRoom: '2',
    carPark: '1',
    locale: 'en',
    published_at: '2021-12-21T16:02:31.071Z',
    created_at: '2021-12-21T16:02:31.091Z',
    updated_at: '2021-12-23T07:02:57.836Z',
    localizations: [],
  },
  {
    id: 2,
    name: '38/220 Middle Street, Sydney',
    property_slug: 'middle-street',
    type: 'apartment',
    listType: 'rent',
    address: '38/220 Middle Street, Sydney',
    price: 100000,
    shortDetail:
      'Offering an exceptional opportunity to obtain this stunning apartment filled with natural light, here you can enjoy the vigour of the top-notch, urban lifestyle that Sydney CBD offers. Delightfully located in a secure building',
    fullDetail:
      'Showcasing two double bedrooms, both w/ built-ins, and a contemporary open plan living/dining area, this property is perfect for an inner-city home or an investment opportunity.',
    bedRoom: '1',
    bathRoom: '2',
    carPark: '1',
    locale: 'en',
    published_at: '2021-12-21T16:02:31.071Z',
    created_at: '2021-12-21T16:02:31.124Z',
    updated_at: '2021-12-23T07:03:01.992Z',
    localizations: [],
  },
  {
    id: 3,
    name: 'ttt',
    property_slug: 'ttt',
    type: 'apartment',
    listType: 'rent',
    address: 'eee',
    price: 44,
    shortDetail: 'fff',
    fullDetail: 'fff',
    bedRoom: '3',
    bathRoom: '3',
    carPark: '3',
    locale: 'en',
    published_at: '2021-12-22T04:46:37.229Z',
    created_at: '2021-12-22T04:46:37.288Z',
    updated_at: '2021-12-23T07:02:45.697Z',
    localizations: [],
  },
  {
    id: 4,
    name: 'ttt',
    property_slug: 'ttt',
    type: 'apartment',
    listType: 'rent',
    address: 'eee',
    price: 44,
    shortDetail: 'fff',
    fullDetail: 'fff',
    bedRoom: '3',
    bathRoom: '3',
    carPark: '3',
    locale: 'en',
    published_at: '2021-12-22T04:48:07.498Z',
    created_at: '2021-12-22T04:48:07.516Z',
    updated_at: '2021-12-23T07:02:40.957Z',
    localizations: [],
  },
  {
    id: 6,
    name: 'faf afd',
    property_slug: 'fdsa',
    type: 'apartment',
    listType: 'rent',
    address: 'fdsaf',
    price: 33,
    shortDetail: 'fdsf',
    fullDetail: 'fsdaf',
    bedRoom: '3',
    bathRoom: '2',
    carPark: '2',
    locale: 'en',
    published_at: '2021-12-22T05:29:12.350Z',
    created_at: '2021-12-22T05:29:12.380Z',
    updated_at: '2021-12-22T05:29:12.380Z',
    localizations: [],
  },
];

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { listType: 'rent', search: 'sydney' },
    };
  },
}));

describe('Property Search Result', () => {
  beforeEach(() => {
    mockAxios.get.mockResolvedValue({
      data: properties,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Show text', async () => {
    render(<PropertySearchResult />);
    const text = screen.getByText(/Search Result/i);
    expect(text).toBeInTheDocument();
  });

  it('Loading text is shown while API request is in progress', async () => {
    render(<PropertySearchResult />);

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
  });
});
