import { Link } from 'react-router-dom'
import { Compass, Ear, ShieldCheck, Sparkles } from 'lucide-react'
import { CtaBand } from '../components/CtaBand'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { DraftNote, Section, SectionHead } from '../components/Section'
import { services } from '../data/services'
import { useMeta } from '../lib/useMeta'

const approach = [
  { i: Ear, t: 'Écouter', d: 'Chaque projet commence par la compréhension de votre besoin, de votre budget et de vos délais.' },
  { i: Compass, t: 'Orienter', d: 'Nous vous guidons vers la solution la plus adaptée parmi nos différents domaines d’intervention.' },
  { i: Sparkles, t: 'Accompagner', d: 'Nous restons à vos côtés pour avancer concrètement, étape par étape.' },
]
const commitments = [
  { t: 'Clarté', d: 'Des informations simples et compréhensibles, sans jargon inutile.' },
  { t: 'Disponibilité', d: 'Une équipe joignable par téléphone, WhatsApp ou sur place aux horaires d’ouverture.' },
  { t: 'Honnêteté', d: 'Des échanges transparents sur ce que nous pouvons – ou non – faire pour vous.' },
]

export default function About() {
  useMeta('À propos', 'Découvrez Express Business Bénin (EBB), structure basée à Akassato, Abomey-Calavi : immobilier, gestion immobilière, recrutement et services aux entreprises.')
  return (
    <>
      <PageHero eyebrow="À propos" title="Découvrez Express Business Bénin" text="Une entreprise structurée, à l’écoute de ses clients, présente à Abomey-Calavi pour porter vos projets." />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead eyebrow="Présentation" title="Une entreprise, plusieurs façons de vous aider." />
            <Reveal>
              <p className="-mt-6 text-lg leading-relaxed text-ink/80">
                Express Business Bénin, ou EBB, est installée à Akassato, dans la commune d’Abomey-Calavi. Son activité couvre l’immobilier — achat, vente et location —, la gestion de biens, le recrutement et le placement de personnel, ainsi que des services destinés aux entreprises.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink/80">
                Cette diversité repose sur une même idée : offrir à chaque client un interlocuteur de confiance, capable de l’orienter et de l’accompagner.
              </p>
              <DraftNote>Texte de présentation à enrichir avec l’histoire et les chiffres validés par EBB.</DraftNote>
            </Reveal>
          </div>
          <Reveal><div className="overflow-hidden rounded-lg shadow-soft"><img src="/images/about.webp" width={768} height={960} loading="lazy" decoding="async" alt="Salon d’une villa avec éclairage intégré au plafond" className="aspect-[4/3] w-full object-cover" /></div></Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Notre approche" title="Écouter, orienter, accompagner." />
        <div className="grid gap-6 md:grid-cols-3">
          {approach.map(({ i: Icon, t, d }, k) => (
            <Reveal key={t} delay={k * 0.08}>
              <div className="h-full rounded-lg border border-navy/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-navy text-gold"><Icon className="h-6 w-6" aria-hidden /></span>
                <h3 className="mt-6 font-display text-xl font-extrabold text-navy">{t}</h3>
                <p className="mt-3 leading-relaxed text-ink/75">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Nos domaines d’expertise" title="Ce que nous faisons." />
        <div className="divide-y divide-navy/10 border-y border-navy/10">
          {services.map((s) => (
            <Reveal key={s.id}>
              <Link to={`/services#${s.id}`} className="group grid items-center gap-2 py-6 transition-colors hover:bg-mist sm:grid-cols-[18rem_1fr_auto] sm:gap-8 sm:px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-navy">
                <h3 className="font-display text-xl font-extrabold text-navy">{s.title}</h3>
                <p className="text-ink/75">{s.short}</p>
                <span className="text-sm font-semibold text-navy-800 transition-transform group-hover:translate-x-1">Détails →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <SectionHead tone="dark" eyebrow="Nos engagements" title="Une relation fondée sur la confiance." />
        <div className="grid gap-8 md:grid-cols-3">
          {commitments.map((c, k) => (
            <Reveal key={c.t} delay={k * 0.08}>
              <ShieldCheck className="h-8 w-8 text-gold" aria-hidden />
              <h3 className="mt-5 font-display text-xl font-extrabold">{c.t}</h3>
              <p className="mt-3 leading-relaxed text-white/70">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <div className="pt-16 sm:pt-24"><CtaBand title="Parlons de votre projet." /></div>
    </>
  )
}
