import type { Property } from '../data/properties'

export function formatPrice(p: Property): string {
  if (p.price == null) return 'Prix sur demande'
  const n = new Intl.NumberFormat('fr-FR').format(p.price).replace(/[\u202f\u00a0]/g, ' ')
  return p.transaction === 'location' ? `${n} FCFA / mois` : `${n} FCFA`
}
