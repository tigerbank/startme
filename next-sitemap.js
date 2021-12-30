const siteUrl = 'https://teerasakyukan.com';
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/real-estate'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },

      {
        userAgent: '*',
        disallow: ['/login', '/register'],
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/server-sitemap.xml`,
      `${siteUrl}/sitemap.xml`,
    ],
  },
  exclude: ['/register', '/login'],
};
