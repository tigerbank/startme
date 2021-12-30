import axios from 'axios';
import {
  LoginInfoProps,
  PropertyProps,
  RegisterInfoProps,
} from '@/interfaces/common';

export function getStrapiURL(path: string) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

export async function fetchAPI(path: string, signal: any) {
  const res = await fetch(getStrapiURL(path), signal);
  return res.json();
}

export async function axiosAPI(path: string, signal: any) {
  const response = await axios.get(getStrapiURL(path), signal);
  return response.data;
}

export async function getPageData(slug: string[], locale: string) {
  const joinedSlug = slug.join('/');
  const data = await fetchAPI(
    `/pages?slug=${joinedSlug}&_locale=${locale}`,
    null,
  );

  if (data == null || data.length === 0) {
    return null;
  }
  return data[0];
}

export async function getGlobalData(locale: string) {
  return fetchAPI(`/global?_locale=${locale}`, null);
}

export async function getTodosData() {
  return fetchAPI(`/todos`, null);
}

export async function getProducts() {
  return fetchAPI(`/products`, null);
}

export async function getProductsBySlug(slug: string[]) {
  const data = await fetchAPI(`/products?slug=${slug}`, null);
  return data[0];
}

export async function getOrder(id: number) {
  return fetchAPI(`/orders/${id}`, null);
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
export async function getJobsData(signal: any) {
  return fetchAPI(`/jobs`, signal);
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
    null,
  );
}

export async function getCompanies(signal: any) {
  return axiosAPI(`/companies`, signal);
}

export async function getLocations(signal: any) {
  return axiosAPI(`/cities`, signal);
}

export async function getBrands(signal: any) {
  return axiosAPI(`/brands`, signal);
}

export async function filterProducts(filters: any) {
  let arr = [];
  if (filters.s !== '') {
    arr.push(`name_contains=${filters.s}`);
  }

  if (filters.range.length !== 0) {
    arr.push(`price_gte=${filters.range[0]}&price_lte=${filters.range[1]}`);
  }

  if (filters.checkedBrand !== []) {
    let brandArr: string[] = [];
    filters?.checkedBrand?.forEach((brand: number) => {
      brandArr.push(`brands.id=${brand}`);
    });

    arr.push(`${brandArr.join('&')}`);
  }

  return axiosAPI(`/products?${arr.join('&')}`, null);
}

export async function getPropertyBySlug(slug: string[]) {
  const data = await fetchAPI(`/properties?property_slug=${slug}`, null);
  return data[0];
}

export async function getAllProperties(signal: any) {
  return fetchAPI(`/properties`, signal);
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

export async function filterProperty(
  searchString: any,
  listType: any,
  signal: any,
) {
  return axiosAPI(
    `/properties?name_contains=${searchString}&listType=${listType}`,
    signal,
  );
}

export async function getTestProperties() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/properties`,
  );
  return response.data;
}
