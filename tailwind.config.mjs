import relumeTailwind from "@relume_io/relume-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  // Le preset officiel Relume fournit exactement les memes couleurs,
  // tailles de texte et reglages que dans l'editeur Relume.
  presets: [relumeTailwind],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}"],
};
