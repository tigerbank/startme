export function getStrapiURL(path: string) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

export async function fetchApi(path: string) {
  const res = await fetch(getStrapiURL(path));
  return res.json();
}

export async function getPageData(slug: any, locale: string) {
  const joinedSlug = slug.join('/');
  const data = await fetchApi(`/pages?slug=${joinedSlug}&_locale=${locale}`);
  return data[0];
}

export async function getNavData(locale: string) {
  return fetchApi(`/navigations?_locale=${locale}`);
}
