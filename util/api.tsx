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
