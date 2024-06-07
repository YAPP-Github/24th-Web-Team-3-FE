import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Myframe Client Service",
    short_name: "Myframe",
    description: "Myframe client service",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    icons: [
      {
        src: "/pwa-icons/192.png",
        sizes: "192x192",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/pwa-icons/512.png",
        sizes: "512x512",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/pwa-icons/512.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
