export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Chykechidan Enterprise",
    htmlAttrs: {
      lang: "en",
      "data-wf-domain": "chykechidan.com",
    },

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      {
        content: "One of the best investment platform in Europe.",
        name: "description",
      },
      {
        content:
          "Make a Good Decision Now... Buy your food items from the best sellers.",
        property: "og:title",
      },
      {
        content:
          "There is no better time to take a good chance than when the opportunity present.",
        property: "og:description",
      },
      {
        content: "https://chykechidan.com/Logo.png",
        property: "og:image",
      },
      {
        content:
          "Make a Good Decision Now... Buy your food items from the best sellers.",
        property: "twitter:title",
      },
      {
        content:
          "At Chykechidan Enterprise, we sell quality food items at the best prices...",
        property: "twitter:description",
      },
      {
        content: "https://chykechidan.com/Logo.png",
        property: "twitter:image",
      },
      { property: "og:type", content: "website" },
      { content: "summary_large_image", name: "twitter:card" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { content: "Webflow", name: "generator" },
    ],

    link: [
      { rel: "icon", type: "image/x-icon", href: "/Icon.png" },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
      },
      {
        rel: "stylesheet",
        href: "/css/custom.css",
      },

      { href: "https://fonts.googleapis.com", rel: "preconnect" },
      {
        href: "https://fonts.gstatic.com",
        rel: "preconnect",
        crossorigin: "anonymous",
      },
    ],

    script: [
      {
        src: "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",
        type: "text/javascript",
      },
      {
        src: "/script/query.js",
        type: "text/javascript",
      },
      {
        src: "/script/home.js",
        type: "text/javascript",
      },

      // {
      //   src: "https://code.tidio.co/0gqmbzwnpgualga6qdslyngzvcs0rocd.js",
      //   type: "text/javascript",
      //   async: true,
      // },
      {
        src: "/script/smartSupport.js",
        type: "text/javascript",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ["~/assets/css/main.css"],

  plugins: [
    { src: "~/plugins/fontLoader.js", mode: "client" },
    { src: "~/plugins/clientFontLoader.js", mode: "client" },
    // { src: "~/plugins/support.js", ssr: false },
    // { src: "~/plugins/socket.io.js", ssr: false },
  ],

  router: {
    base: "/",
    middleware: ["isAuthenticated"],
  },

  auth: {
    strategies: {
      local: {
        // scheme: 'refresh'
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer",
        },
        user: {
          property: "user",
          autoFetch: true,
        },

        endpoints: {
          login: { url: "/users/login", method: "post" },
          logout: false,
          user: { url: "/users/get-user", method: "get" },
        },
      },
    },
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],

  generate: {
    routes: [
      // Add the confirmation route to the generated routes
    ],
  },

  axios: {
    baseURL: "https://chykechidan.com/chyke/api",
  },
  publicRuntimeConfig: {
    FILE_URL: "https://chykechidan.com/chyke/api/uploads",
  },

  // axios: {
  //   baseURL: "http://127.0.0.1/Chyke/api",
  // },
  // publicRuntimeConfig: {
  //   FILE_URL: "http://127.0.0.1/Chyke/api/uploads",
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  target: "static",
};
