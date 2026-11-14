import type { VisualVariant } from '../components/Visual'

export type Transaction = 'vente' | 'location'
export type PropertyType = 'maison' | 'parcelle' | 'appartement' | 'autre'

export interface Property {
  slug: string
  title: string
  transaction: Transaction
  type: PropertyType
  location: string
  /** Prix en FCFA (par mois pour une location). Omettre → « Prix sur demande ». */
  price?: number
  surface?: string
  rooms?: number
  baths?: number
  features: string[]
  description: string
  visual: VisualVariant
  /** Photos : dossier /public/biens/<slug>/ (01.webp, 02.webp…). La 1re photo sert de couverture. Sans photo : illustration. */
  photos?: string[]
  /** Annonce d'exemple. Mettre false pour une vraie annonce. */
  demo: boolean
}

/**
 * ⚠️ DONNÉES DE DÉMONSTRATION — ce ne sont pas de vraies annonces d'EBB.
 * Pour ajouter un bien : ajouter un objet ci-dessous (demo: false pour une annonce réelle).
 */
export const properties: Property[] = [
  {
    slug: 'villa-moderne-akassato',
    title: 'Villa moderne avec cour',
    transaction: 'vente',
    type: 'maison',
    location: 'Akassato',
    price: 45000000,
    surface: '400 m²',
    rooms: 4,
    baths: 3,
    features: ['Cour clôturée', 'Eau et électricité', 'Quartier calme', 'Parking'],
    description:
      "Exemple d'annonce : villa de plain-pied sur une parcelle clôturée, dans un quartier résidentiel. Remplacez ce texte par la description réelle du bien.",
    visual: 'villa',
    photos: ['/biens/villa-moderne-akassato/01.webp', '/biens/villa-moderne-akassato/02.webp', '/biens/villa-moderne-akassato/03.webp', '/biens/villa-moderne-akassato/04.webp', '/biens/villa-moderne-akassato/05.webp', '/biens/villa-moderne-akassato/06.webp'],
    demo: true,
  },
  {
    slug: 'appartement-calavi-centre',
    title: 'Appartement 3 pièces',
    transaction: 'location',
    type: 'appartement',
    location: 'Abomey-Calavi',
    price: 250000,
    surface: '95 m²',
    rooms: 3,
    baths: 2,
    features: ['Balcon', 'Cuisine équipée', 'Gardiennage', 'Proche des commerces'],
    description:
      "Exemple d'annonce : appartement lumineux au premier étage d'un immeuble sécurisé. Remplacez ce texte par la description réelle du bien.",
    visual: 'apartment',
    photos: ['/biens/appartement-calavi-centre/01.webp', '/biens/appartement-calavi-centre/02.webp', '/biens/appartement-calavi-centre/03.webp'],
    demo: true,
  },
  {
    slug: 'parcelle-viabilisee-godomey',
    title: 'Parcelle viabilisée',
    transaction: 'vente',
    type: 'parcelle',
    location: 'Godomey',
    price: 18000000,
    surface: '500 m²',
    features: ['Terrain plat', 'Accès route', 'Situation foncière à vérifier avec EBB'],
    description:
      "Exemple d'annonce : parcelle plane facilement accessible, idéale pour un projet résidentiel. Remplacez ce texte par la description réelle du bien.",
    visual: 'land',
    demo: true,
  },
  {
    slug: 'maison-familiale-cotonou',
    title: 'Maison familiale',
    transaction: 'location',
    type: 'maison',
    location: 'Cotonou',
    price: 450000,
    surface: '220 m²',
    rooms: 5,
    baths: 3,
    features: ['Jardin', 'Garage', 'Groupe électrogène', 'Clôture'],
    description:
      "Exemple d'annonce : maison spacieuse adaptée à une famille, dans un quartier bien desservi. Remplacez ce texte par la description réelle du bien.",
    visual: 'villa',
    photos: ['/biens/maison-familiale-cotonou/01.webp'],
    demo: true,
  },
  {
    slug: 'local-commercial-calavi',
    title: 'Local commercial en bord de route',
    transaction: 'location',
    type: 'autre',
    location: 'Abomey-Calavi',
    surface: '60 m²',
    features: ['Bord de route', 'Grande vitrine', 'Zone passante'],
    description:
      "Exemple d'annonce : local commercial bien exposé, adapté à une boutique ou à un bureau. Prix communiqué sur demande.",
    visual: 'tower',
    photos: ['/biens/local-commercial-calavi/01.webp', '/biens/local-commercial-calavi/02.webp'],
    demo: true,
  },
  {
    slug: 'duplex-ouidah',
    title: 'Duplex récent',
    transaction: 'vente',
    type: 'maison',
    location: 'Ouidah',
    surface: '280 m²',
    rooms: 4,
    baths: 3,
    features: ['Terrasse', 'Finitions récentes', 'Quartier résidentiel'],
    description:
      "Exemple d'annonce : duplex récent avec terrasse. Prix communiqué sur demande. Remplacez ce texte par la description réelle du bien.",
    visual: 'apartment',
    photos: ['/biens/duplex-ouidah/01.webp', '/biens/duplex-ouidah/02.webp'],
    demo: true,
  },
]

export const typeLabels: Record<PropertyType, string> = {
  maison: 'Maison',
  parcelle: 'Parcelle',
  appartement: 'Appartement',
  autre: 'Autre',
}
export const transactionLabels: Record<Transaction, string> = { vente: 'À vendre', location: 'À louer' }

export const budgetTiers: Record<Transaction, { value: number; label: string }[]> = {
  vente: [
    { value: 20000000, label: "Jusqu'à 20 M FCFA" },
    { value: 40000000, label: "Jusqu'à 40 M FCFA" },
    { value: 60000000, label: "Jusqu'à 60 M FCFA" },
    { value: 100000000, label: "Jusqu'à 100 M FCFA" },
  ],
  location: [
    { value: 150000, label: "Jusqu'à 150 000 FCFA / mois" },
    { value: 300000, label: "Jusqu'à 300 000 FCFA / mois" },
    { value: 500000, label: "Jusqu'à 500 000 FCFA / mois" },
    { value: 1000000, label: "Jusqu'à 1 000 000 FCFA / mois" },
  ],
}
