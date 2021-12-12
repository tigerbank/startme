import { LoginInfoProps, RegisterInfoProps } from '@/interfaces/common';
import axios from 'axios';

export function getStrapiURL(path: string) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

export async function fetchAPI(path: string) {
  const res = await fetch(getStrapiURL(path));
  return res.json();
}

export async function getPageData(slug: string[], locale: string) {
  const joinedSlug = slug.join('/');
  const data = await fetchAPI(`/pages?slug=${joinedSlug}&_locale=${locale}`);

  if (data == null || data.length === 0) {
    return null;
  }
  return data[0];
}

export async function getNavData(locale: string) {
  return fetchAPI(`/navigations?_locale=${locale}`);
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

//frontend filter
export async function getJobsData() {
  return fetchAPI(`/jobs`);
}

//backend filter
export async function axiosJobsData(filterJobs: {
  s: string;
  company: string;
  city: string;
}) {
  console.log(filterJobs);

  let arr = [];

  if (filterJobs.s !== '') {
    arr.push(`position_contains=${filterJobs.s}`);
  }

  if (filterJobs.company !== '' && filterJobs.company !== 'All') {
    arr.push(`company.name=${filterJobs.company}`);
  }

  if (filterJobs.city !== '' && filterJobs.city !== 'All') {
    arr.push(`city=${filterJobs.city}`);
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/jobs/?${arr.join('&')}`,
  );
  return response.data;
}
