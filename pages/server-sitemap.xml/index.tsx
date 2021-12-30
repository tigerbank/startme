import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getAllProperties, getProducts } from '@/util/api';
import { ProductProps, PropertyProps } from '@/interfaces/common';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const properties = await getAllProperties(null);
  const products = await getProducts();

  const propertiesUrl = properties.map((property: PropertyProps) => ({
    loc: `https://teerasakyukan.com/real-estate/${property.property_slug}`,
    lastmod: new Date().toISOString(),
  }));

  const productsUrl = products.map((product: ProductProps) => ({
    loc: `https://teerasakyukan.com/shop/product/${product.slug}`,
    lastmod: new Date().toISOString(),
  }));

  const fields = [...propertiesUrl, ...productsUrl];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
