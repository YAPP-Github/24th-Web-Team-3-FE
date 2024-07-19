if (!self.define) {
  let e,
    s = {}
  const a = (a, t) => (
    (a = new URL(a + ".js", t).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script")
          ;(e.src = a), (e.onload = s), document.head.appendChild(e)
        } else (e = a), importScripts(a), s()
      }).then(() => {
        let e = s[a]
        if (!e) throw new Error(`Module ${a} didn’t register its module`)
        return e
      })
  )
  self.define = (t, i) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href
    if (s[n]) return
    let c = {}
    const r = (e) => a(e, n),
      f = { module: { uri: n }, exports: c, require: r }
    s[n] = Promise.all(t.map((e) => f[e] || r(e))).then((e) => (i(...e), c))
  }
}
define(["./workbox-3c9d0171"], function (e) {
  "use strict"
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/AUR4XRf73Zr0Ht2xYN2Rk/_buildManifest.js",
          revision: "a403340f6001126722b00630fa90e454",
        },
        {
          url: "/_next/static/AUR4XRf73Zr0Ht2xYN2Rk/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/121-106b9bd35379ad71.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/136-95f155e4edff6046.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/285-cb15190bf052afca.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/332-aac2ece78c3bc866.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/342-e04e978876fa8151.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/462-52166dfd65ff131c.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/465-d335b1020724df65.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/789-b3098eb23af6425b.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/847-9f54bad86ab693ae.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/a67cc4ef-55f8d75f9dca14a6.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-5dcd30dd6a6e8d6c.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/app/album/%5Bid%5D/page-1fef0123e1f4ed20.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/app/album/create/page-790a41c6d3f2cfe5.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/app/album/page-4b0420d7389b29f1.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/app/api/auth/%5B...login%5D/page-09039dfabf564b93.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/app/layout-b927bfb46fea34b9.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/app/loading-f7fc44d479bed6b9.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/app/page-3bf2afb85042f645.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/app/profile/page-0931661977908dee.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/app/scanner/page-faf2b2b9dde7e038.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/app/scanner/select-album/page-1d73f6aa5b304ce4.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/framework-6e06c675866dc992.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/main-af3e55f71695f458.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/main-app-e68333e37c6107c0.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/pages/_app-de47d6d29ff05868.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/pages/_error-435f8ccca04fda18.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-64b337ccc88f8048.js",
          revision: "AUR4XRf73Zr0Ht2xYN2Rk",
        },
        {
          url: "/_next/static/css/21fc83d864e4b592.css",
          revision: "21fc83d864e4b592",
        },
        {
          url: "/_next/static/css/8594a9c458d02098.css",
          revision: "8594a9c458d02098",
        },
        {
          url: "/_next/static/css/b6f968312f652be8.css",
          revision: "b6f968312f652be8",
        },
        {
          url: "/_next/static/media/37d64f18eeefe942-s.p.otf",
          revision: "84c0ea9d65324c758c8bd9686207afea",
        },
        {
          url: "/_next/static/media/37df6d196b83fb77-s.p.otf",
          revision: "6fe301765c4f438e2034a0a47b609c61",
        },
        {
          url: "/_next/static/media/4c6abbd43e4cb4f7-s.p.otf",
          revision: "13a352bd44156de92cce335ce93cd02d",
        },
        {
          url: "/_next/static/media/6b41048cc81d716f-s.p.otf",
          revision: "049bb07edff45e5817fa4f892ebabe98",
        },
        {
          url: "/_next/static/media/7723cdf1bf265a32-s.p.otf",
          revision: "de507f665f6ea63a94678e529b2a4ff0",
        },
        {
          url: "/_next/static/media/ad4a9de7afeff32e-s.p.otf",
          revision: "32c8b7e405cd546866e5ef1d33179cba",
        },
        {
          url: "/_next/static/media/ajax-loader.0b80f665.gif",
          revision: "0b80f665",
        },
        {
          url: "/_next/static/media/db44480779af6c52-s.p.otf",
          revision: "de308b576c70af4871d436e89918fdf6",
        },
        {
          url: "/_next/static/media/e1ebf73abb5b6d23-s.p.otf",
          revision: "67e8e4773c05f2988c52dfe6ea337f33",
        },
        {
          url: "/_next/static/media/ff83d1ea747af124-s.p.otf",
          revision: "f8a9b84216af5155ffe0e8661203f36f",
        },
        { url: "/_next/static/media/slick.25572f22.eot", revision: "25572f22" },
        {
          url: "/_next/static/media/slick.653a4cbb.woff",
          revision: "653a4cbb",
        },
        { url: "/_next/static/media/slick.6aa1ee46.ttf", revision: "6aa1ee46" },
        { url: "/_next/static/media/slick.db61df16.svg", revision: "db61df16" },
        {
          url: "/images/AlbumItem_Carousell.svg",
          revision: "52a1246021f0133943d805ace25e19ad",
        },
        {
          url: "/splash/192.png",
          revision: "5685ed6b9756d4d104d816926a0b6077",
        },
        {
          url: "/splash/256.png",
          revision: "e068eaf921a104ae46d7383c5b0a29d5",
        },
        {
          url: "/splash/512.png",
          revision: "95c2557576ffd4938e51b5c35f2de297",
        },
        {
          url: "/splash/logo.png",
          revision: "e208fa356b355e004d20666e0b44f4ce",
        },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: s } }) =>
        !(!e || s.startsWith("/api/auth/callback") || !s.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        "1" === e.headers.get("RSC") &&
        "1" === e.headers.get("Next-Router-Prefetch") &&
        a &&
        !s.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        "1" === e.headers.get("RSC") && a && !s.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: s }) => s && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    )
})
