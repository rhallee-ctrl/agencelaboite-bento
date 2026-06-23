// Genere un fichier HTML autonome et anime a partir de la page construite.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const src = readFileSync("dist/index.html", "utf8");

// Recupere le CSS reel du projet (genere par Astro/Tailwind avec le theme Relume)
// pour l'integrer directement dans le fichier : aucun acces internet requis.
const cssFile = readdirSync("dist/_astro").find((f) => f.endsWith(".css"));
const projectCss = readFileSync(`dist/_astro/${cssFile}`, "utf8");

// Integre GSAP directement (depuis node_modules) pour un fichier 100% hors ligne.
// On neutralise tout "</script>" eventuel pour ne pas casser la balise inline.
const safe = (js) => js.replace(/<\/script>/gi, "<\\/script>");
const gsapCore = safe(readFileSync("node_modules/gsap/dist/gsap.min.js", "utf8"));
const gsapScrollTrigger = safe(
  readFileSync("node_modules/gsap/dist/ScrollTrigger.min.js", "utf8")
);

// Styles de base + animations
const styles = `
  body { background:#ffffff; color:#000000; }
  .no-scrollbar::-webkit-scrollbar { display:none; }
  .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }

  /* Apparition en fondu au defilement */
  .reveal { opacity:0; transform:translateY(28px);
    transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
  .reveal.in { opacity:1; transform:none; }

  /* Boutons : leger soulevement au survol */
  button { transition: transform .2s ease, background-color .2s ease, color .2s ease, opacity .2s ease; }
  button:hover { transform: translateY(-2px); }

  /* Images du portfolio : zoom doux au survol */
  article > div:first-child { overflow:hidden; }
  article img { transition: transform .5s cubic-bezier(.16,1,.3,1); }
  article:hover img { transform: scale(1.05); }

  /* Respecte les utilisateurs qui desactivent les animations */
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity:1 !important; transform:none !important; }
    button:hover, article:hover img { transform:none; }
  }
`;

// Script d'animation : fait apparaitre chaque bloc de contenu quand il entre a l'ecran
const script = `
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      var targets = document.querySelectorAll("section .container, section > .grid, footer .container");
      targets.forEach(function (el) { el.classList.add("reveal"); });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
      targets.forEach(function (el) { io.observe(el); });
    });
  </script>
`;

const head = `
  <style>${projectCss}</style>
  <style>${styles}</style>
`;

// On utilise des fonctions de remplacement pour eviter l'interpretation des "$"
let html = src
  // retire la feuille de style du projet (remplacee par le CSS integre)
  .replace(/<link rel="stylesheet"[^>]*>/g, "")
  // remplace les scripts GSAP du CDN par les versions integrees (hors ligne)
  .replace(
    /<script[^>]*src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/gsap\/[^"]*\/gsap\.min\.js"[^>]*>\s*<\/script>/,
    () => `<script>${gsapCore}</script>`
  )
  .replace(
    /<script[^>]*src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/gsap\/[^"]*\/ScrollTrigger\.min\.js"[^>]*>\s*<\/script>/,
    () => `<script>${gsapScrollTrigger}</script>`
  )
  // injecte le CSS du projet + les styles d'animation dans le head
  .replace("</head>", () => head + "</head>")
  // injecte le script d'apparition au defilement avant la fin du body
  .replace("</body>", () => script + "</body>");

writeFileSync("apercu-anime.html", html, "utf8");
console.log("apercu-anime.html genere (" + html.length + " octets)");
