import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Button } from '../components/Button'
import { CtaBand } from '../components/CtaBand'
import { PageHero } from '../components/PageHero'
import { PropertyCard } from '../components/PropertyCard'
import { Reveal } from '../components/Reveal'
import { DraftNote, Section, SectionHead } from '../components/Section'
import { budgetTiers, properties, typeLabels, type PropertyType, type Transaction } from '../data/properties'
import { useMeta } from '../lib/useMeta'

const sel = 'block min-h-[48px] w-full rounded-md border border-navy/25 bg-white px-4 py-3 text-base text-ink transition-colors hover:border-navy/50 focus:border-navy focus:outline focus:outline-2 focus:outline-gold disabled:cursor-not-allowed disabled:bg-mist disabled:text-ink/50'

export default function Immobilier() {
  useMeta('Immobilier', 'Achat, vente et location de maisons, parcelles et appartements avec Express Business Bénin à Abomey-Calavi. Recherchez un bien et demandez des informations.')
  const [params, setParams] = useSearchParams()
  const t = (params.get('t') as Transaction | null) ?? ''
  const type = (params.get('type') as PropertyType | null) ?? ''
  const loc = params.get('loc') ?? ''
  const budget = Number(params.get('budget') ?? 0)

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key === 't') next.delete('budget') // les tranches de budget dépendent du type de transaction
    setParams(next, { replace: true })
  }

  const locations = useMemo(() => [...new Set(properties.map((p) => p.location))].sort(), [])
  const results = useMemo(
    () =>
      properties.filter(
        (p) =>
          (!t || p.transaction === t) &&
          (!type || p.type === type) &&
          (!loc || p.location === loc) &&
          (!budget || (p.price != null && p.price <= budget)),
      ),
    [t, type, loc, budget],
  )
  const active = Boolean(t || type || loc || budget)

  return (
    <>
      <PageHero eyebrow="Immobilier" title="Trouvez le bien qui vous correspond." text="Achat, vente, location : recherchez parmi nos biens et contactez-nous pour organiser une visite ou obtenir des informations." />

      <Section className="pb-8 sm:pb-10">
        <div className="grid gap-12 lg:grid-cols-3">
          {[
            { t: 'Acheter', d: 'Maisons, parcelles, appartements : nous vous aidons à identifier le bien adapté à votre projet et à votre budget.' },
            { t: 'Vendre', d: 'Confiez-nous votre bien : nous le présentons à des acquéreurs et vous accompagnons dans la démarche.' },
            { t: 'Louer', d: 'Propriétaires comme locataires, trouvez un interlocuteur pour mettre en relation et organiser les visites.' },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 0.07}>
              <p className="font-display text-sm font-bold tracking-[0.2em] text-gold-dark">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-navy">{x.t}</h2>
              <p className="mt-3 leading-relaxed text-ink/75">{x.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="mist" id="catalogue" className="scroll-mt-20">
        <SectionHead eyebrow="Catalogue" title="Les biens disponibles" />

        <form onSubmit={(e) => e.preventDefault()} role="search" aria-label="Rechercher un bien" className="mb-8 grid gap-4 rounded-lg border border-navy/10 bg-white p-5 shadow-soft sm:grid-cols-2 sm:p-6 lg:grid-cols-[repeat(4,1fr)_auto]">
          <div>
            <label htmlFor="f-t" className="mb-1.5 block text-sm font-semibold text-navy">Vente / Location</label>
            <select id="f-t" className={sel} value={t} onChange={(e) => update('t', e.target.value)}>
              <option value="">Vente ou location</option>
              <option value="vente">Vente</option>
              <option value="location">Location</option>
            </select>
          </div>
          <div>
            <label htmlFor="f-type" className="mb-1.5 block text-sm font-semibold text-navy">Type de bien</label>
            <select id="f-type" className={sel} value={type} onChange={(e) => update('type', e.target.value)}>
              <option value="">Tous les types</option>
              {(Object.keys(typeLabels) as PropertyType[]).map((k) => <option key={k} value={k}>{typeLabels[k]}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-loc" className="mb-1.5 block text-sm font-semibold text-navy">Localisation</label>
            <select id="f-loc" className={sel} value={loc} onChange={(e) => update('loc', e.target.value)}>
              <option value="">Toutes les zones</option>
              {locations.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-budget" className="mb-1.5 block text-sm font-semibold text-navy">Budget</label>
            <select id="f-budget" className={sel} value={budget || ''} disabled={!t} onChange={(e) => update('budget', e.target.value)} aria-describedby="f-budget-hint">
              <option value="">{t ? 'Tous budgets' : 'Choisir vente ou location'}</option>
              {t && budgetTiers[t].map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
            <p id="f-budget-hint" className="sr-only">Le budget dépend du choix vente ou location.</p>
          </div>
          <div className="flex items-end">
            <Button variant="outline" disabled={!active} onClick={() => setParams({}, { replace: true })} className="w-full lg:w-auto">Réinitialiser</Button>
          </div>
        </form>

        <p className="mb-6 text-sm font-medium text-ink/70" role="status" aria-live="polite">
          {results.length} bien{results.length > 1 ? 's' : ''} {active ? 'correspondant à votre recherche' : 'affichés'}
        </p>

        {results.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => <PropertyCard key={p.slug} property={p} />)}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-navy/25 bg-white px-6 py-14 text-center">
            <Search className="mx-auto h-9 w-9 text-navy-800/60" aria-hidden />
            <h3 className="mt-4 font-display text-xl font-extrabold text-navy">Aucun bien ne correspond à ces critères</h3>
            <p className="mx-auto mt-2 max-w-md text-ink/70">Élargissez votre recherche, ou décrivez-nous ce que vous cherchez : nous vous recontacterons.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="outline" onClick={() => setParams({}, { replace: true })}>Réinitialiser les filtres</Button>
              <Button to="/contact?service=immobilier" variant="navy">Décrire ma recherche</Button>
            </div>
          </div>
        )}
        <DraftNote>Annonces d’exemple. Les biens réels s’ajoutent dans le fichier src/data/properties.ts.</DraftNote>
      </Section>

      <div className="pt-16 sm:pt-24">
        <CtaBand title="Vous ne trouvez pas votre bien ?" text="Dites-nous ce que vous recherchez, ou proposez-nous votre bien à la vente ou à la location." />
      </div>
    </>
  )
}
