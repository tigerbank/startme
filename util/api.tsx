import {
  LoginInfoProps,
  PropertyProps,
  RegisterInfoProps,
} from '@/interfaces/common';
import axios from 'axios';

export function getStrapiURL(path: string) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

export async function fetchAPI(path: string) {
  const res = await fetch(getStrapiURL(path));
  return res.json();
}

export async function axiosAPI(path: string) {
  const response = await axios.get(getStrapiURL(path));
  return response.data;
}

export async function getPageData(slug: string[], locale: string) {
  const joinedSlug = slug.join('/');
  const data = await fetchAPI(`/pages?slug=${joinedSlug}&_locale=${locale}`);

  if (data == null || data.length === 0) {
    return null;
  }
  return data[0];
}

export async function getGlobalData(locale: string) {
  return fetchAPI(`/global?_locale=${locale}`);
}

export async function getTodosData() {
  return fetchAPI(`/todos`);
}

export async function getProducts() {
  return fetchAPI(`/products`);
}

export async function getProductsBySlug(slug: string[]) {
  const data = await fetchAPI(`/products?slug=${slug}`);
  return data[0];
}

export async function getOrder(id: number) {
  return fetchAPI(`/orders/${id}`);
}

export async function updateOrderStatus(id: number) {
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isPaid: true }),
  });
}

export async function postLogin(loginInfo: LoginInfoProps) {
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginInfo),
  });
}

export async function postRegister(registerInfo: RegisterInfoProps) {
  return fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local/register`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerInfo),
    },
  );
}

export async function subscribeMail(mail: string) {
  return fetch('/api/mailingList', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: mail,
    }),
  });
}

export async function sendGridsubscribeMail(mail: string) {
  return fetch('https://api.sendgrid.com/v3/marketing/contacts', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      list_ids: [process.env.SENDGRID_MAILIINGLIST_ID],
      contacts: [
        {
          email: mail,
        },
      ],
    }),
  });
}

//frontend jobs filter
export async function getJobsData() {
  return fetchAPI(`/jobs`);
}

//backend jobs filter
export async function axiosJobsData(
  filterJobs: {
    s: string;
    company: string;
    location: string;
    page: number;
  },
  perPage: number,
) {
  let arr = [];

  if (filterJobs.s !== '') {
    arr.push(`position_contains=${filterJobs.s}`);
  }

  if (filterJobs.company !== '' && filterJobs.company !== 'All') {
    arr.push(`company.name=${filterJobs.company}`);
  }

  if (filterJobs.location !== '' && filterJobs.location !== 'All') {
    arr.push(`location.id=${filterJobs.location}`);
  }

  return axiosAPI(
    `/jobs/?_limit=${perPage}&_start=${
      perPage * (filterJobs.page - 1)
    }&${arr.join('&')}`,
  );
}

export async function getCompanies() {
  return axiosAPI(`/companies`);
}

export async function getLocations() {
  return axiosAPI(`/cities`);
}

export async function getBrands() {
  return axiosAPI(`/brands`);
}

export async function filterProducts(filterProducts: any) {
  let arr = [];
  if (filterProducts.s !== '') {
    arr.push(`name_contains=${filterProducts.s}`);
  }

  if (filterProducts.range.length !== 0) {
    arr.push(
      `price_gte=${filterProducts.range[0]}&price_lte=${filterProducts.range[1]}`,
    );
  }

  if (filterProducts.checkedBrand !== []) {
    let brandArr: string[] = [];
    filterProducts?.checkedBrand?.forEach((brand: number) => {
      brandArr.push(`brands.id=${brand}`);
    });

    arr.push(`${brandArr.join('&')}`);
  }

  return axiosAPI(`/products?${arr.join('&')}`);
}

export async function getPropertyBySlug(slug: string[]) {
  const data = await fetchAPI(`/properties?property_slug=${slug}`);
  return data[0];
}

export async function getAllProperties() {
  return fetchAPI(`/properties`);
}

export async function postProperty(data: PropertyProps) {
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/properties`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function filterProperty(searchString: any, listType: any) {
  return axiosAPI(
    `/properties?name_contains=${searchString}&listType=${listType}`,
  );
}

export async function getTestProperties() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/properties`,
  );
  return response.data;
}
