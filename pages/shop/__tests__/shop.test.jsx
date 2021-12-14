import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Shop from '@/pages/shop';

import mockAxios from 'axios';
import { filterProducts } from '@/util/api';
// jest.mock('axios');

describe('Shop ', () => {
  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  it('render "Shop" Page', () => {
    render(
      <Shop
        data={[
          {
            id: 1,
            name: 'Free Shirt',
            slug: 'free-shirt',
            price: 70,
            category: 'Shirts',
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
            locale: 'th',
            published_at: '2021-11-21T12:04:04.454Z',
            created_at: '2021-11-21T12:04:02.026Z',
            updated_at: '2021-11-21T12:04:04.479Z',
            image: {
              id: 10,
              name: 'shirt1.jpg',
              alternativeText: '',
              caption: '',
              width: 915,
              height: 915,
              formats: {
                thumbnail: {
                  name: 'thumbnail_shirt1.jpg',
                  hash: 'thumbnail_shirt1_1104108bc8',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  width: 156,
                  height: 156,
                  size: 3.82,
                  path: null,
                  url: 'https://res.cloudinary.com/di4k2zher/image/upload/v1637496175/startme-development/thumbnail_shirt1_1104108bc8.jpg',
                  provider_metadata: {
                    public_id:
                      'startme-development/thumbnail_shirt1_1104108bc8',
                    resource_type: 'image',
                  },
                },
                medium: {
                  name: 'medium_shirt1.jpg',
                  hash: 'medium_shirt1_1104108bc8',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  width: 750,
                  height: 750,
                  size: 55.69,
                  path: null,
                  url: 'https://res.cloudinary.com/di4k2zher/image/upload/v1637496178/startme-development/medium_shirt1_1104108bc8.jpg',
                  provider_metadata: {
                    public_id: 'startme-development/medium_shirt1_1104108bc8',
                    resource_type: 'image',
                  },
                },
                small: {
                  name: 'small_shirt1.jpg',
                  hash: 'small_shirt1_1104108bc8',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  width: 500,
                  height: 500,
                  size: 27.36,
                  path: null,
                  url: 'https://res.cloudinary.com/di4k2zher/image/upload/v1637496180/startme-development/small_shirt1_1104108bc8.jpg',
                  provider_metadata: {
                    public_id: 'startme-development/small_shirt1_1104108bc8',
                    resource_type: 'image',
                  },
                },
              },
              hash: 'shirt1_1104108bc8',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 77.69,
              url: 'https://res.cloudinary.com/di4k2zher/image/upload/v1637496173/startme-development/shirt1_1104108bc8.jpg',
              previewUrl: null,
              provider: 'cloudinary',
              provider_metadata: {
                public_id: 'startme-development/shirt1_1104108bc8',
                resource_type: 'image',
              },
              created_at: '2021-11-21T12:03:00.588Z',
              updated_at: '2021-11-21T12:03:00.609Z',
            },
            localizations: [],
          },
          {
            id: 2,
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            price: 80,
            category: 'Shirts',
            brand: 'Adidas',
            rating: 4.2,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
            locale: 'th',
            published_at: '2021-11-21T12:04:52.460Z',
            created_at: '2021-11-21T12:04:50.159Z',
            updated_at: '2021-11-21T12:04:52.484Z',
            image: {
              id: 14,
              name: 'shirt2.jpg',
              alternativeText: '',
              caption: '',
              width: 915,
              height: 915,
              formats: {
                thumbnail: {
                  name: 'thumbnail_shirt2.jpg',
                  hash: 'thumbnail_shirt2_243d61ff6f',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  width: 156,
                  height: 156,
                  size: 3.55,
                  path: null,
                  url: 'https://res.cloudinary.com/di4k2zher/image/upload/v1637496196/startme-development/thumbnail_shirt2_243d61ff6f.jpg',
                  provider_metadata: {
                    public_id:
                      'startme-development/thumbnail_shirt2_243d61ff6f',
                    resource_type: 'image',
                  },
                },
                medium: {
                  name: 'medium_shirt2.jpg',
                  hash: 'medium_shirt2_243d61ff6f',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  width: 750,
                  height: 750,
                  size: 30.08,
                  path: null,
                  url: 'https://res.cloudinary.com/di4k2zher/image/upload/v1637496197/startme-development/medium_shirt2_243d61ff6f.jpg',
                  provider_metadata: {
                    public_id: 'startme-development/medium_shirt2_243d61ff6f',
                    resource_type: 'image',
                  },
                },
                small: {
                  name: 'small_shirt2.jpg',
                  hash: 'small_shirt2_243d61ff6f',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  width: 500,
                  height: 500,
                  size: 17.2,
                  path: null,
                  url: 'https://res.cloudinary.com/di4k2zher/image/upload/v1637496199/startme-development/small_shirt2_243d61ff6f.jpg',
                  provider_metadata: {
                    public_id: 'startme-development/small_shirt2_243d61ff6f',
                    resource_type: 'image',
                  },
                },
              },
              hash: 'shirt2_243d61ff6f',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 36.89,
              url: 'https://res.cloudinary.com/di4k2zher/image/upload/v1637496195/startme-development/shirt2_243d61ff6f.jpg',
              previewUrl: null,
              provider: 'cloudinary',
              provider_metadata: {
                public_id: 'startme-development/shirt2_243d61ff6f',
                resource_type: 'image',
              },
              created_at: '2021-11-21T12:03:19.976Z',
              updated_at: '2021-11-21T12:03:19.988Z',
            },
            localizations: [],
          },
        ]}
      />,
    );
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
  });

  it('Show "no product" if data is empty', () => {
    render(<Shop data={[]} />);
    expect(screen.getByText(/No product available/i)).toBeInTheDocument();
  });

  it('when type in input box, input update', () => {
    render(<Shop data={[]} />);
    const input = screen.getByPlaceholderText(/Product name/i);
    userEvent.type(input, 'hello');
    expect(input.value).toBe('hello');
  });
});
