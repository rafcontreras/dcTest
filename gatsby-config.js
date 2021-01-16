const siteUrl = "https://localhost:8000";

const PORT = process.env.NODE_ENV === "production" ? 3300 : 8000;

module.exports = {
  siteMetadata: {
    title: "Shopping List",
    siteUrl
  },
  proxy: {
    prefix: "/api",
    url: `http://localhost:${PORT}`
  },
  plugins: [
    "gatsby-plugin-preact",
    "gatsby-plugin-sass",
    "gatsby-plugin-layout",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Shopping List Test for David Clark Designs",
        short_name: "Shopping List",
        start_url: "/",
        dir: "ltr",
        lang: "en",
        background_color: "#E4B140",
        theme_color: "#404040",
        display: "standalone",
        description:
          "Shopping List Test for David Clark Designs: Node, Express, Gatsby, React",
        icon: "src/images/icon.png",
        legacy: true
      }
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          importWorkboxFrom: "local",
          cacheId: "shopping-list-offline",
          runtimeCaching: [
            {
              urlPattern: /^.*(api).*$/,
              handler: "NetworkOnly"
            },
            {
              urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
              handler: "StaleWhileRevalidate"
            },
            {
              urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|json|css)$/,
              handler: "StaleWhileRevalidate"
            },
            {
              urlPattern: /^.*\/font\/.*\.(woff|woff2)$/,
              handler: "CacheFirst"
            }
          ],
          skipWaiting: true,
          clientsClaim: true
        },
        debug: false
      }
    }
  ]
};
