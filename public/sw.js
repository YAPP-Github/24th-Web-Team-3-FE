if (!self.define) {
  let e,
    s = {}
  const a = (a, n) => (
    (a = new URL(a + ".js", n).href),
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
  self.define = (n, i) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href
    if (s[t]) return
    let c = {}
    const g = (e) => a(e, t),
      r = { module: { uri: t }, exports: c, require: g }
    s[t] = Promise.all(n.map((e) => r[e] || g(e))).then((e) => (i(...e), c))
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
          url: "/_next/static/chunks/121-842e1302f81f032b.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/285-0869f5040a4b2b54.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/323-870a54866142734b.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/342-b8dc253c5ac550fa.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/460-0acc185b65db7593.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/465-866876a19d759e36.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/494-765796572a7a25a5.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/616-35028d584b84d8e3.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/978-cc33320615f69cd9.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/a67cc4ef-2c571d757b327875.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-6e01a5cc062d1894.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/album/%5Bid%5D/page-c8c54e51ab101243.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/album/create/page-813e4455776b40b1.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/album/layout-9b2e42a3df49aef0.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/album/page-339b7a8aaf3faf4e.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/api/auth/%5B...login%5D/page-b4f7e9965ae4718d.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/layout-d89eeaa3b58c2a9a.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/loading-94a67a8f0c0b5979.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/page-fe9929dabe67ecb6.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/profile/page-0295ba670ba9191d.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/scanner/page-9168fe48763470ac.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/app/scanner/select-album/page-508907e4cfaafe61.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/framework-6e06c675866dc992.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/main-af3e55f71695f458.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/main-app-e68333e37c6107c0.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/pages/_app-de47d6d29ff05868.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/pages/_error-435f8ccca04fda18.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-6d649e97ac7696e4.js",
          revision: "gGOj0EPYHdgJWc8vDagsL",
        },
        {
          url: "/_next/static/css/39c7578ab7679500.css",
          revision: "39c7578ab7679500",
        },
        {
          url: "/_next/static/css/a8b54424595ed043.css",
          revision: "a8b54424595ed043",
        },
        {
          url: "/_next/static/gGOj0EPYHdgJWc8vDagsL/_buildManifest.js",
          revision: "a403340f6001126722b00630fa90e454",
        },
        {
          url: "/_next/static/gGOj0EPYHdgJWc8vDagsL/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/media/ajax-loader.0b80f665.gif",
          revision: "0b80f665",
        },
        {
          url: "/_next/static/media/ff840cfebfb63b0c-s.p.woff2",
          revision: "302ec55f5b4320354ec6b35a53dead87",
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
