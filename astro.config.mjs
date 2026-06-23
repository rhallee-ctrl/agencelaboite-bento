import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Adresse publique du site une fois en ligne (GitHub Pages)
  site: "https://rhallee-ctrl.github.io",
  base: "/agencelaboite-bento",
  integrations: [tailwind()],
});
