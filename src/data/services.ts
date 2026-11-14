import type { VisualVariant } from '../components/Visual'

export interface Service {
  id: string
  title: string
  short: string
  intro: string
  needs: string[]
  offers: string[]
  visual: VisualVariant
  /** Photo (dans /public/images/services/). Sans photo : illustration. */
  photo?: string
  photoAlt?: string
  to: string
}

/** Contenus provisoires : décrire ici uniquement les prestations validées par EBB. */
export const services: Service[] = [
  {
    id: 'immobilier',
    title: 'Immobilier',
    short: 'Achat, vente et location de maisons, parcelles et appartements.',
    intro: "EBB vous accompagne dans vos projets d'acquisition, de vente ou de location de biens immobiliers.",
    needs: [
      'Trouver un bien qui correspond à votre budget',
      'Vendre ou mettre en location votre bien',
      'Être guidé dans vos démarches',
    ],
    offers: ['Achat et vente de biens', 'Location de biens', 'Visites et mise en relation', 'Conseil personnalisé'],
    visual: 'villa',
    photo: '/images/services/immobilier.webp',
    photoAlt: 'Maison à étage avec balcon et jardin',
    to: '/immobilier',
  },
  {
    id: 'gestion',
    title: 'Gestion immobilière',
    short: 'Un suivi attentif de vos biens pour vous libérer du quotidien.',
    intro: 'Confiez-nous la gestion de vos biens afin de les valoriser et de simplifier leur suivi au quotidien.',
    needs: [
      'Gagner du temps sur le suivi de votre patrimoine',
      'Sécuriser la relation avec vos locataires',
      'Garder une vue claire sur vos biens',
    ],
    offers: ['Suivi de la location', 'Relation avec les locataires', 'Suivi de l’état des biens', 'Compte rendu au propriétaire'],
    visual: 'apartment',
    photo: '/images/services/gestion.webp',
    photoAlt: 'Cour intérieure d’une villa au carrelage hexagonal',
    to: '/contact?service=gestion',
  },
  {
    id: 'recrutement',
    title: 'Recrutement et placement',
    short: 'Identifier et placer les profils adaptés aux besoins des employeurs.',
    intro: 'EBB met en relation les entreprises et les candidats pour des recrutements et des placements de personnel.',
    needs: [
      'Recruter un profil adapté à votre structure',
      'Gagner du temps dans la sélection des candidats',
      'Trouver une opportunité professionnelle',
    ],
    offers: ['Définition du besoin', 'Recherche et présélection de profils', 'Mise en relation', 'Placement de personnel'],
    visual: 'office',
    to: '/contact?service=recrutement',
  },
  {
    id: 'entreprises',
    title: 'Services aux entreprises',
    short: 'Un interlocuteur unique pour les autres besoins de votre activité.',
    intro: "Au-delà de l'immobilier et du recrutement, EBB peut répondre à d'autres besoins liés à votre activité.",
    needs: ['Un interlocuteur unique et joignable', 'Des besoins variés à traiter au même endroit'],
    offers: ['Étude de votre demande', 'Orientation vers la prestation adaptée', 'Devis sur demande'],
    visual: 'tower',
    photo: '/images/services/entreprises.webp',
    photoAlt: 'Bâtiment à étage en cours de construction',
    to: '/contact?service=entreprises',
  },
]

export const serviceOptions = [
  { value: 'immobilier', label: 'Immobilier' },
  { value: 'gestion', label: 'Gestion immobilière' },
  { value: 'recrutement', label: 'Recrutement et placement' },
  { value: 'entreprises', label: 'Services aux entreprises' },
  { value: 'autre', label: 'Autre demande' },
]
