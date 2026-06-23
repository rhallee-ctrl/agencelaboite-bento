# agencelaboite-bento

Page d'accueil de La Boite Image, reconstruite proprement à partir de
l'export Relume, avec **Astro** + **Tailwind CSS** (preset officiel Relume
pour garder exactement les mêmes couleurs et tailles de texte).

Aucune animation pour l'instant : le rendu est statique, fidèle au visuel Relume.

## Voir le résultat dans le navigateur

1. Installer les dépendances (une seule fois) :

   ```
   npm install
   ```

2. Lancer le site en mode développement :

   ```
   npm run dev
   ```

3. Ouvrir l'adresse affichée dans le terminal, en général :

   **http://localhost:4321**

   La page se recharge toute seule à chaque modification de fichier.

Pour arrêter le serveur : `Ctrl + C` dans le terminal.

## Structure du projet

```
src/
  layouts/Layout.astro        → le squelette HTML de la page
  pages/index.astro           → la page d'accueil (assemble les sections)
  components/                  → une section = un fichier
    Navbar.astro
    Hero.astro
    Portfolio.astro
    Header47.astro
    Expertises.astro
    Gallery.astro
    Stats.astro
    Valeurs.astro             → les onglets Créativité / Proximité / Audace
    Testimonials.astro
    Beauce.astro
    CtaForm.astro
    CtaCentered.astro
    Footer.astro
  styles/global.css           → fond blanc / texte noir (thème Relume)
tailwind.config.mjs            → utilise le preset Relume
```

Chaque section de la page est dans son propre fichier dans `src/components/`.
Pour modifier un texte, ouvre le fichier correspondant et change le contenu :
pas besoin de toucher au reste.

## Commandes utiles

| Commande          | Effet                                             |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Lance le site en local (développement)            |
| `npm run build`   | Génère la version finale dans le dossier `dist/`  |
| `npm run preview` | Prévisualise la version finale générée            |

## À propos des images

Les images sont pour l'instant les images d'exemple de Relume (chargées depuis
leur serveur). On les remplacera par les vraies images de La Boite Image plus tard.
