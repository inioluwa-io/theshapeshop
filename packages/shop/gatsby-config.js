const config = require('./src/utils/config.js');

module.exports = {
  siteMetadata: {
    title: config.siteName,
    author: config.author,
    description: config.description,
    siteUrl: config.siteUrl,
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'k19oil4y',
        dataset: 'production',
        // a token with read permissions is required
        // if you have a private dataset
        // token: process.env.SANITY_TOKEN,
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`, // Important!
            options: {
              background: '#222',
            },
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-source-contentful`,
    //   options: {
    //     spaceId: `o6uhtcakujse`,
    //     accessToken: `42627fbeb9475a7867204b28243ff40aa2aec93995ecac371eea9957dda734b2`,
    //     downloadLocal: false,
    //   },
    // },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: config.googleAnalytics,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteName,
        short_name: config.siteName,
        start_url: config.siteUrl,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: `minimal-ui`,
        icon: `./static/images/logo-1024.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
