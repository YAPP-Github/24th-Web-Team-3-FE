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
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href
    if (s[c]) return
    let n = {}
    const o = (e) => a(e, c),
      r = { module: { uri: c }, exports: n, require: o }
    s[c] = Promise.all(t.map((e) => r[e] || o(e))).then((e) => (i(...e), n))
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
          url: "/_next/static/chunks/121-16aed2bf2db67129.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/234-8ba8dc118f78a905.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/285-8f9d291264eaa7c4.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/342-1824dc6820862369.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/374-0e244463139d760c.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/375-701d690f63833a38.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/414-0f73f3f2e41c1eb0.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/429-6443368b6ab4cba2.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/479-34ac6ba6c053e14c.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/514-d9b6a18124965de2.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/786-8d8f34b62b32e5ab.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/789-b3098eb23af6425b.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/a67cc4ef-55f8d75f9dca14a6.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-4da9d17b112cc9e0.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/album/%5Bid%5D/page-cf8b393bca3242c7.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/album/create/page-37048959cfb9f558.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/album/page-6c29abfaaff4c7ab.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/layout-55a5ead39e2c3add.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/loading-f7fc44d479bed6b9.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/page-df050da0ee5138c7.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/profile/introduction/keywords/page-41fac4fd4eb7da61.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/profile/introduction/page-7a4dec19afbc051d.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/profile/page-ab35ae4c53da0ef1.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/scanner/page-524ec251cd2ef8d0.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/app/scanner/select-album/page-cdc7ae0ee30c3c23.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/framework-6e06c675866dc992.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/main-a661ffdd535a18ca.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/main-app-9b3422297e43f742.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/pages/_app-de47d6d29ff05868.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/pages/_error-435f8ccca04fda18.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-98af39ffcb6e5170.js",
          revision: "otcNUz1HyZb70O2VYEGGz",
        },
        {
          url: "/_next/static/css/433e143ee495001d.css",
          revision: "433e143ee495001d",
        },
        {
          url: "/_next/static/css/fe3a60801567c078.css",
          revision: "fe3a60801567c078",
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
          url: "/_next/static/otcNUz1HyZb70O2VYEGGz/_buildManifest.js",
          revision: "a403340f6001126722b00630fa90e454",
        },
        {
          url: "/_next/static/otcNUz1HyZb70O2VYEGGz/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
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
