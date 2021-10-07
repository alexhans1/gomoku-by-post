module.exports = {
  siteMetadata: {
    siteUrl: "https://www.gomoku-by-post.de",
    title: "Gomoku by Post",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Gomoku by Post",
        short_name: "Gomoku by Post",
        start_url: "/",
        description: "Gomoku game to play with friends and family.",
        background_color: "#0a68f0",
        theme_color: "#0a68f0",
        display: "standalone",
        icon: "src/images/icon.png",
        icons: [
          {
            src: "/favicons/pwa-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicons/pwa-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    "gatsby-plugin-typescript",
  ],
};
