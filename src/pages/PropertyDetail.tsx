import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Bath, BedDouble, Check, MapPin, MessageCircle, Phone, Ruler } from 'lucide-react'
import { Button } from '../components/Button'
import { ContactForm } from '../components/ContactForm'
import { PropertyCard } from '../components/PropertyCard'
import { Section } from '../components/Section'
import { Visual, type VisualVariant } from '../components/Visual'
import { company } from '../data/company'
import { properties, transactionLabels, typeLabels } from '../data/properties'
import { formatPrice } from '../lib/format'
import { whatsappLink } from '../lib/contact'
import { useMeta } from '../lib/useMeta'
import NotFound from './NotFound'

type Slide = { label: string; src?: string; variant?: VisualVariant }

function Detail({ slug }: { slug: string }) {
  const p = properties.find((x) => x.slug === slug)!
  const [i, setI] = useState(0)
  useMeta(p.title, `${p.title} – ${typeLabels[p.type]} ${transactionLabels[p.transaction].toLowerCase()} à ${p.location}. ${formatPrice(p)}. Demandez des informations à Express Business Bénin.`)

  const slides: Slide[] = p.photos?.length
    ? p.photos.map((src, k) => ({ label: `Photo ${k + 1}`, src }))
    : [{ label: 'Façade', variant: p.visual }, ...(p.type === 'parcelle' ? [] : [{ label: 'Plan', variant: 'plan' as VisualVariant }]), { label: 'Situation', variant: 'map' as VisualVariant }]
  const cur = slides[i] ?? slides[0]
  const similar = properties.filter((x) => x.slug !== p.slug && (x.type === p.type || x.transaction === p.transaction)).slice(0, 3)
  const wa = whatsappLink(`Bonjour EBB, je souhaite des informations sur « ${p.title} » (${p.location}, ${formatPrice(p)}).`)

  return (
    <>
      <div className="border-b border-navy/10 bg-mist">
        <div className="mx-auto max-w-page px-5 py-4 sm:px-8">
          <Link to="/immobilier#catalogue" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-navy-800 hover:text-navy">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Retour aux biens
          </Link>
        </div>
      </div>

      <Section className="!py-10 sm:!py-14">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div>
            <div className="relative overflow-hidden rounded-lg bg-mist">
              {cur.src ? <img src={cur.src} alt={`${p.title} – ${cur.label}`} className="aspect-[4/3] w-full object-cover" /> : <Visual variant={cur.variant!} className="aspect-[4/3] w-full" label={`${p.title} – ${cur.label} (illustration)`} />}
              {p.demo && <span className="absolute right-4 top-4 rounded-sm bg-gold px-2.5 py-1 text-xs font-bold text-navy">Exemple de démonstration</span>}
            </div>
            <ul className={`mt-3 grid grid-cols-3 gap-3 ${slides.length < 2 ? "hidden" : ""}`} aria-label="Galerie">
              {slides.map((s, k) => (
                <li key={s.label}>
                  <button type="button" onClick={() => setI(k)} aria-pressed={k === i} aria-label={`Afficher : ${s.label}`}
                    className={`block w-full overflow-hidden rounded-md border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${k === i ? 'border-gold' : 'border-transparent opacity-80 hover:opacity-100'}`}>
                    {s.src ? <img src={s.src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" /> : <Visual variant={s.variant!} className="aspect-[4/3] w-full" label="" />}
                    <span className="block bg-navy py-1 text-center text-xs font-semibold text-white">{s.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">{typeLabels[p.type]} · {transactionLabels[p.transaction]}</p>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{p.title}</h1>
              <p className="mt-3 flex items-center gap-2 text-ink/75"><MapPin className="h-4 w-4 text-navy-800" aria-hidden />{p.location}</p>

              <h2 className="mt-10 font-display text-xl font-extrabold text-navy">Description</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink/80">{p.description}</p>

              <h2 className="mt-10 font-display text-xl font-extrabold text-navy">Caractéristiques</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {p.features.map((f) => <li key={f} className="flex gap-3 text-ink/80"><Check className="mt-1 h-4 w-4 shrink-0 text-gold-dark" aria-hidden />{f}</li>)}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-navy/10 bg-white p-6 shadow-soft">
              <p className="text-sm text-ink/60">{p.transaction === 'location' ? 'Loyer' : 'Prix'}</p>
              <p className="font-display text-3xl font-extrabold text-navy">{formatPrice(p)}</p>
              <ul className="mt-5 grid grid-cols-3 gap-2 border-t border-navy/10 pt-5 text-center text-sm text-ink/80">
                {p.surface && <li><Ruler className="mx-auto mb-1 h-5 w-5 text-navy-800" aria-hidden />{p.surface}</li>}
                {p.rooms != null && <li><BedDouble className="mx-auto mb-1 h-5 w-5 text-navy-800" aria-hidden />{p.rooms} pièces</li>}
                {p.baths != null && <li><Bath className="mx-auto mb-1 h-5 w-5 text-navy-800" aria-hidden />{p.baths} sdb</li>}
              </ul>
              <div className="mt-6 grid gap-3">
                <Button href={wa} external><MessageCircle className="h-4 w-4" aria-hidden /> Contacter par WhatsApp</Button>
                <Button href={`tel:${company.phones[0].tel}`} variant="outline"><Phone className="h-4 w-4" aria-hidden /> Appeler</Button>
              </div>
            </div>
          </aside>
        </div>

        <div id="demande" className="mt-14 scroll-mt-24 border-t border-navy/10 pt-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy">Demander des informations</h2>
              <p className="mt-3 leading-relaxed text-ink/75">Laissez-nous vos coordonnées : nous reviendrons vers vous pour répondre à vos questions et organiser une visite.</p>
            </div>
            <ContactForm variant="inquiry" defaultService="immobilier" context={`${p.title} (${p.location})`} defaultMessage={`Bonjour, je souhaite des informations sur « ${p.title} » à ${p.location}.`} />
          </div>
        </div>
      </Section>

      {similar.length > 0 && (
        <Section tone="mist">
          <h2 className="mb-8 font-display text-3xl font-extrabold tracking-tight text-navy">Ces biens peuvent aussi vous intéresser</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{similar.map((s) => <PropertyCard key={s.slug} property={s} />)}</div>
        </Section>
      )}
    </>
  )
}

export default function PropertyDetail() {
  const { slug = '' } = useParams()
  if (!properties.some((p) => p.slug === slug)) return <NotFound />
  return <Detail key={slug} slug={slug} />
}
