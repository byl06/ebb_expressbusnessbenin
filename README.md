# Site EBB – Express Business Bénin

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide.

## Démarrer
```bash
npm install
npm run dev        # développement
npm run build      # production (dossier dist/)
```
Déploiement : Vercel (`vercel.json` inclus) ou Netlify (`public/_redirects` inclus).

## Où modifier le contenu
| Fichier | Contenu |
|---|---|
| `src/data/company.ts` | Adresse, téléphones, horaires, WhatsApp, Facebook, mentions légales, interrupteur des mentions « contenu provisoire » |
| `src/data/properties.ts` | **Les annonces** : ajouter un objet = ajouter un bien (page détail et filtres automatiques). `demo: false` pour une vraie annonce ; `photos: ['/biens/x.webp']` pour de vraies photos (à déposer dans `public/biens/`) |
| `src/data/services.ts` | Les 4 services (textes, besoins, prestations) |
| `src/pages/*.tsx` | Contenu éditorial de chaque page |
| `tailwind.config.js` | Palette (marine #10243A, #183D5B, doré #C7A66A, gris #F5F7FA) et polices (Manrope, Inter) |

## Formulaire de contact
Aucun faux envoi : copier `.env.example` en `.env`, renseigner `VITE_FORM_ENDPOINT` (Formspree, Getform, etc.), puis rebuild.
Sans cette variable, une demande valide est préparée puis envoyée par le visiteur via WhatsApp.

## Informations vérifiées (fiche GoAfricaOnline)
Adresse (Akassato, Abomey-Calavi), deux numéros de téléphone, horaires, page Facebook, coordonnées GPS (bouton « Itinéraire »).

## À valider / compléter avant la mise en ligne
1. Le numéro WhatsApp (`company.whatsapp`) est-il bien actif sur WhatsApp ?
2. Textes des services, de « À propos » et « Pourquoi EBB » : provisoires, à valider avec EBB.
3. Annonces : exemples de démonstration (badge « Exemple »). Remplacer par les biens réels.
4. Mentions légales : RCCM, IFU, responsable de publication, hébergeur (`company.legal`).
5. Remplacer `VOTRE-DOMAINE.com` dans `public/sitemap.xml` et `public/robots.txt`.
6. Photos : celles fournies sont provisoires (certaines en basse définition, voir ci-dessous). Les remplacer par les originaux.
7. Pas de carte intégrée : l'adresse est descriptive. Ajouter une carte une fois l'emplacement confirmé.
8. Pour masquer les mentions « Contenu provisoire » : `showDraftNotes: false` dans `company.ts`.

## Où mettre les images (logo et photos)

Tout se range dans `public/`. **Pour remplacer une image par son original : écraser le fichier existant en gardant exactement le même nom** (format WebP recommandé, largeur 1600 px max, qualité ~80). Rien d'autre à modifier.

| Dossier / fichier | Rôle | Taille conseillée |
|---|---|---|
| `public/images/logo/logo-ebb.webp` | Logo rond de l'en-tête et du pied de page (fond transparent) | 256×256 |
| `public/images/logo/logo-ebb-512.png` | Logo grande taille (documents, partage) | 512×512 |
| `public/images/logo/logo-ebb-original.jpg` | Logo d'origine, conservé tel quel | – |
| `public/favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` | Icône de l'onglet et du téléphone | 32 / 192 / 180 |
| `public/og-image.png` | Image affichée au partage du lien (WhatsApp, Facebook) | 1200×630 |
| `public/images/hero.webp` | Grande photo de l'accueil | ≥ 1200×900 |
| `public/images/presentation.webp` | Photo de la section « Qui sommes-nous » (accueil) | ≥ 1200×900 |
| `public/images/about.webp` | Photo de la page À propos | ≥ 1200×900 |
| `public/images/services/immobilier.webp`, `gestion.webp`, `entreprises.webp` | Photos des cartes et sections de services | ≥ 1200×900 |
| `public/biens/<identifiant-du-bien>/01.webp, 02.webp…` | Galerie de chaque bien (la **01** est la couverture) | ≥ 1200×900 |
| `public/images/btp/` | Réserve (non utilisée pour l'instant) | – |

Ajouter une photo à un bien : la déposer dans son dossier, puis la lister dans `photos: [...]` du fichier `src/data/properties.ts`.
Ajouter un nouveau bien : créer `public/biens/<nouvel-identifiant>/01.webp…` et ajouter l'objet dans `properties.ts` avec le même identifiant (`slug`).

Photos actuellement en basse définition (< 600 px de large), à remplacer en priorité :
`biens/appartement-calavi-centre/01.webp` et `02.webp`, `biens/villa-moderne-akassato/05.webp`, `biens/local-commercial-calavi/01.webp` et `02.webp`, `biens/duplex-ouidah/02.webp`, `services/entreprises.webp`.
