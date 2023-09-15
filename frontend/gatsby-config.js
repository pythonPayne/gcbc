/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `GCBC`,
    description: `Grace Covenant Baptist Church, Birmingham Alabama`,
    keywords: `grace, covenant, baptist, church, Birmingham, Alabama`,
    siteUrl: `https://gcbcmain.gatsbyjs.io`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        overlayDrafts: false,
        watchMode: false,
        watchModeBuffer: 150,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GCBC`,
        short_name: `GCBC`,
        start_url: `/`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
  ],
}
