import { Check } from 'lucide-react'
import { Button } from '../components/Button'
import { CtaBand } from '../components/CtaBand'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { DraftNote, Section } from '../components/Section'
import { ServiceMedia } from '../components/ServiceCard'
import { services } from '../data/services'
import { useMeta } from '../lib/useMeta'

export default function Services() {
  useMeta('Nos services', 'Immobilier, gestion immobilière, recrutement et placement, services aux entreprises : découvrez les services d’Express Business Bénin à Abomey-Calavi.')
  return (
    <>
      <PageHero eyebrow="Nos services" title="Des services clairs pour des besoins précis." text="Quatre domaines d’intervention, présentés séparément pour que vous trouviez rapidement ce dont vous avez besoin." />

      {services.map((s, i) => {
        const flip = i % 2 === 1
        return (
          <Section key={s.id} id={s.id} tone={flip ? 'mist' : 'white'} className="scroll-mt-20">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
              <Reveal className={flip ? 'lg:order-2' : ''}>
                <div className="sticky top-28 overflow-hidden rounded-lg shadow-soft">
                  <ServiceMedia service={s} className="aspect-[4/3] w-full" />
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="font-display text-sm font-bold tracking-[0.2em] text-gold-dark">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{s.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink/80">{s.intro}</p>

                <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-navy-800">Besoins auxquels nous répondons</h3>
                <ul className="mt-3 space-y-2.5">
                  {s.needs.map((n) => (
                    <li key={n} className="flex gap-3 text-ink/80"><Check className="mt-1 h-4 w-4 shrink-0 text-gold-dark" aria-hidden />{n}</li>
                  ))}
                </ul>

                <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-navy-800">Prestations associées</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.offers.map((o) => (
                    <li key={o} className="rounded-full border border-navy/15 bg-white px-4 py-1.5 text-sm text-navy">{o}</li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button to={s.id === 'immobilier' ? '/immobilier' : `/contact?service=${s.id}`} variant="navy" arrow>
                    {s.id === 'immobilier' ? 'Voir les biens' : 'Demander des informations'}
                  </Button>
                  {s.id === 'immobilier' && <Button to="/contact?service=immobilier" variant="outline">Demander des informations</Button>}
                </div>
              </Reveal>
            </div>
          </Section>
        )
      })}
      <Section className="pb-0 pt-8"><DraftNote>Prestations indicatives à valider avec EBB avant la mise en ligne.</DraftNote></Section>
      <div className="pt-12"><CtaBand /></div>
    </>
  )
}
