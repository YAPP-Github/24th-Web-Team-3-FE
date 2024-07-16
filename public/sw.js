if (!self.define) {
  let e,
    s = {}
  const a = (a, i) => (
    (a = new URL(a + ".js", i).href),
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
  self.define = (i, t) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href
    if (s[n]) return
    let c = {}
    const o = (e) => a(e, n),
      r = { module: { uri: n }, exports: c, require: o }
    s[n] = Promise.all(i.map((e) => r[e] || o(e))).then((e) => (t(...e), c))
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
          url: "/_next/static/8ELqu7h1fdhqLa6UMZFWo/_buildManifest.js",
          revision: "a403340f6001126722b00630fa90e454",
        },
        {
          url: "/_next/static/8ELqu7h1fdhqLa6UMZFWo/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/121-842e1302f81f032b.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/285-0869f5040a4b2b54.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/342-b8dc253c5ac550fa.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/460-0acc185b65db7593.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/465-2d2f8daf8a4ecb14.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/494-765796572a7a25a5.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/616-35028d584b84d8e3.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/821-9eb8ed37ea911e78.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/978-cc33320615f69cd9.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/a67cc4ef-2c571d757b327875.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-6e01a5cc062d1894.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/album/%5Bid%5D/page-680103b7fbb6378c.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/album/create/page-f6be4148819fdab9.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/album/layout-9b2e42a3df49aef0.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/album/page-d5afff01710f28dc.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/api/auth/%5B...login%5D/page-db230af37877871e.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/layout-ad1c4c18ffe89e6f.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/loading-94a67a8f0c0b5979.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/page-a48df7032f41092d.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/profile/page-98516e4d2fb0e0b9.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/scanner/page-0e76204c2d6f3777.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/app/scanner/select-album/page-f76b41e288ba8620.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/framework-6e06c675866dc992.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/main-af3e55f71695f458.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/main-app-9b3422297e43f742.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/pages/_app-de47d6d29ff05868.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/pages/_error-435f8ccca04fda18.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-64b337ccc88f8048.js",
          revision: "8ELqu7h1fdhqLa6UMZFWo",
        },
        {
          url: "/_next/static/css/21fc83d864e4b592.css",
          revision: "21fc83d864e4b592",
        },
        {
          url: "/_next/static/css/39c7578ab7679500.css",
          revision: "39c7578ab7679500",
        },
        {
          url: "/_next/static/css/ce20ac721507cdd2.css",
          revision: "ce20ac721507cdd2",
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
          revision: "ab5180669dc5ad28340f1b526ad995e9",
        },
        {
          url: "/splash/256.png",
          revision: "98ea36aeb9596ef70fd36169897d4c89",
        },
        {
          url: "/splash/512.png",
          revision: "6b9fa22d96020b702493af4e0063f6d5",
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
