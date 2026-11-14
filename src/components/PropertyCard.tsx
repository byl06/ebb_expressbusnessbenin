import { Link } from 'react-router-dom'
import { Bath, BedDouble, MapPin, Ruler } from 'lucide-react'
import { transactionLabels, typeLabels, type Property } from '../data/properties'
import { formatPrice } from '../lib/format'
import { Visual } from './Visual'

export function PropertyCard({ property: p }: { property: Property }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link to={`/immobilier/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-gold" aria-label={`Voir ${p.title}`}>
        {p.photos?.[0] ? (
          <img src={p.photos[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <Visual variant={p.visual} className="h-full w-full transition-transform duration-700 group-hover:scale-105" label={`Illustration – ${p.title}`} />
        )}
        <span className="absolute left-4 top-4 rounded-sm bg-navy px-2.5 py-1 text-xs font-semibold text-white">{transactionLabels[p.transaction]}</span>
        {p.demo && <span className="absolute right-4 top-4 rounded-sm bg-gold px-2.5 py-1 text-xs font-bold text-navy">Exemple</span>}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">{typeLabels[p.type]}</p>
        <h3 className="mt-1.5 font-display text-lg font-extrabold text-navy">
          <Link to={`/immobilier/${p.slug}`} className="hover:underline underline-offset-4">{p.title}</Link>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink/70"><MapPin className="h-4 w-4 shrink-0 text-navy-800" aria-hidden />{p.location}</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/80">
          {p.surface && <li className="flex items-center gap-1.5"><Ruler className="h-4 w-4 text-navy-800" aria-hidden />{p.surface}</li>}
          {p.rooms != null && <li className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-navy-800" aria-hidden />{p.rooms} pièces</li>}
          {p.baths != null && <li className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-navy-800" aria-hidden />{p.baths} sdb</li>}
        </ul>
        <div className="mt-5 flex flex-1 items-end justify-between gap-3 border-t border-navy/10 pt-5">
          <p className="font-display text-lg font-extrabold text-navy">{formatPrice(p)}</p>
        </div>
        <Link
          to={`/immobilier/${p.slug}#demande`}
          className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-md border border-navy/25 px-4 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          Demander des informations
        </Link>
      </div>
    </article>
  )
}
