import React from 'react';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Sections from '@/components/sections';
import { PageProps } from '@/interfaces/common';
import { getPageData, getGlobalData, fetchAPI } from '@/util/api';
import Newsletter from '@/components/Newsletter';
import ParagraphContent from '@/components/ParagraphContent';

function Page({ page }: { page: PageProps }) {
  const sections = page.contentSections;
  return (
    <>
      <NextSeo
        title={page.meta.metaTitle ? page.meta.metaTitle : ''}
        description={page.meta.metaTitle ? page.meta.metaDescription : ''}
      />
      <Sections sections={sections} />
      <ParagraphContent />
      {/* <Newsletter /> */}
    </>
  );
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  // Get all pages from Strapi
  const allPages = locales.map(async (locale: string) => {
    return fetchAPI(`/pages?_locale=${locale}`, null);
  });

  const pages = await Promise.all(allPages);

  const pagesCombined = pages.flat();

  const paths = pagesCombined.map((page: any) => {
    const slugArray = !page.slug ? [''] : page.slug.split('/');

    return {
      params: { slug: slugArray },
      locale: page.locale,
    };
  });

  return { paths, fallback: 'blocking' };
}
export async function getStaticProps({
  params,
  locale,
}: {
  params: { slug: string[] };
  locale: string;
}) {
  const { slug } = params;
  const page = await getPageData(slug ? slug : [''], locale);
  const global = await getGlobalData(locale);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      page,
      global,
    },
    revalidate: 10,
  };
}

export default Page;
