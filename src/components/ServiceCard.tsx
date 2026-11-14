import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '../data/services'
import { Visual } from './Visual'

export function ServiceMedia({ service, className = '' }: { service: Service; className?: string }) {
  return service.photo ? (
    <img src={service.photo} alt={service.photoAlt ?? ''} loading="lazy" decoding="async" className={`object-cover ${className}`} />
  ) : (
    <Visual variant={service.visual} className={className} label={`Illustration – ${service.title}`} />
  )
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      to={service.to}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ServiceMedia service={service} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-sm bg-navy px-2.5 py-1 font-display text-xs font-bold tracking-widest text-gold">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-extrabold text-navy">{service.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/75">{service.short}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">
          En savoir plus
          <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
