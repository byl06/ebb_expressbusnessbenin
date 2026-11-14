import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarClock, MapPin, MessageCircle } from 'lucide-react'
import { Button } from '../components/Button'
import { CtaBand } from '../components/CtaBand'
import { PropertyCard } from '../components/PropertyCard'
import { Reveal } from '../components/Reveal'
import { DraftNote, Section, SectionHead } from '../components/Section'
import { ServiceCard } from '../components/ServiceCard'
import { properties } from '../data/properties'
import { services } from '../data/services'
import { useMeta } from '../lib/useMeta'

const reasons = [
  { t: 'Un interlocuteur unique', d: 'Immobilier, gestion, recrutement : vos différents besoins sont traités par une même équipe.' },
  { t: 'Une équipe joignable', d: 'Ouverts du lundi au vendredi de 8h à 17h30, et le samedi jusqu’à 15h.' },
  { t: 'Une présence locale', d: 'Une adresse physique à Akassato, Abomey-Calavi, pour échanger de vive voix.' },
  { t: 'Plusieurs façons de nous joindre', d: 'Téléphone, WhatsApp ou formulaire : choisissez le canal qui vous convient.' },
]

export default function Home() {
  useMeta('', 'Express Business Bénin (EBB) à Abomey-Calavi : immobilier, gestion immobilière, recrutement et services aux entreprises. Contactez-nous pour votre projet.')
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full border border-gold/10" />
        <div className="relative mx-auto grid max-w-page items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              <span aria-hidden className="h-px w-8 bg-gold" /> Express Business Bénin
            </p>
            <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              Des solutions adaptées à vos <span className="text-gold">ambitions.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Immobilier, gestion immobilière, recrutement et services aux entreprises : EBB vous accompagne dans vos projets, à Abomey-Calavi et au-delà.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to="/services" arrow>Découvrir nos services</Button>
              <Button to="/contact" variant="outlineLight">Parlons de votre projet</Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full rounded-lg border border-gold/60" />
            <div className="relative overflow-hidden rounded-lg">
              <img src="/images/hero.webp" width={852} height={640} fetchPriority="high" alt="Villa moderne à toit plat, façade blanche et bardage brun" className="aspect-[5/4] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 rounded-md bg-white px-5 py-4 text-navy shadow-lift sm:left-[-1.5rem] sm:right-auto sm:max-w-[16rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">Trois métiers</p>
              <p className="mt-1 font-display text-[15px] font-bold leading-snug">Immobilier · Gestion · Recrutement</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BANDE DE CONFIANCE */}
      <div className="border-b border-navy/10 bg-white">
        <ul className="mx-auto grid max-w-page gap-px px-5 py-7 sm:grid-cols-3 sm:px-8">
          {[
            { i: MapPin, t: 'Akassato, Abomey-Calavi', s: 'Une adresse pour vous recevoir' },
            { i: CalendarClock, t: 'Du lundi au samedi', s: '8h – 17h30 (samedi jusqu’à 15h)' },
            { i: MessageCircle, t: 'Appel ou WhatsApp', s: 'Une réponse rapide à vos questions' },
          ].map(({ i: Icon, t, s }) => (
            <li key={t} className="flex items-center gap-4 py-2 sm:px-4 sm:first:pl-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-mist text-navy-800"><Icon className="h-5 w-5" aria-hidden /></span>
              <span><span className="block font-display text-[15px] font-bold text-navy">{t}</span><span className="text-sm text-ink/65">{s}</span></span>
            </li>
          ))}
        </ul>
      </div>

      {/* PRÉSENTATION */}
      <Section className="pt-20 sm:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-lg"><img src="/images/presentation.webp" width={810} height={1080} loading="lazy" decoding="async" alt="Salon lumineux d’une villa, sol en marbre et plafond lumineux" className="aspect-[4/3] w-full object-cover" /></div>
              <div aria-hidden className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-lg bg-mist" />
            </div>
          </Reveal>
          <div>
            <SectionHead eyebrow="Qui sommes-nous" title="Un partenaire pour vos projets et vos ambitions." />
            <Reveal delay={0.1}>
              <p className="-mt-6 text-lg leading-relaxed text-ink/80">
                Express Business Bénin est une structure basée à Akassato, dans la commune d’Abomey-Calavi. Elle accompagne particuliers et entreprises sur plusieurs besoins : trouver, vendre ou louer un bien, confier la gestion de son patrimoine, recruter ou se faire placer.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink/80">
                Notre approche : écouter votre besoin, vous répondre clairement et rester disponible tout au long de votre projet.
              </p>
              <div className="mt-8"><Button to="/a-propos" variant="outline" arrow>Découvrir EBB</Button></div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* DOMAINES */}
      <Section tone="mist">
        <SectionHead eyebrow="Nos domaines d’intervention" title="Quatre expertises, un seul interlocuteur." text="Choisissez le domaine qui correspond à votre besoin ou parlez-nous de votre projet." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.07} className="h-full"><ServiceCard service={s} index={i} /></Reveal>
          ))}
        </div>
        <DraftNote>Descriptions à valider avec EBB avant la mise en ligne.</DraftNote>
      </Section>

      {/* IMMOBILIER */}
      <Section>
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
          <SectionHead eyebrow="Immobilier" title="Une sélection de biens." text="Maisons, parcelles, appartements : découvrez quelques exemples de biens et demandez des informations en un clic." />
          <Reveal className="sm:mb-14"><Button to="/immobilier" variant="outline" arrow>Voir tous les biens</Button></Reveal>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full"><PropertyCard property={p} /></Reveal>
          ))}
        </div>
        <DraftNote>Annonces d’exemple : elles seront remplacées par les biens réels d’EBB.</DraftNote>
      </Section>

      {/* POURQUOI EBB */}
      <Section tone="navy">
        <SectionHead tone="dark" eyebrow="Pourquoi choisir EBB ?" title="Ce que vous pouvez attendre de nous." />
        <div className="grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.07} className="bg-navy">
              <div className="h-full p-7 transition-colors hover:bg-navy-800/50">
                <p className="font-display text-sm font-bold tracking-[0.2em] text-gold">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-display text-xl font-extrabold">{r.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/60">
          Besoin d’un renseignement précis ? <Link to="/contact" className="font-semibold text-gold underline underline-offset-4">Écrivez-nous</Link>.
        </p>
      </Section>

      <div className="pt-16 sm:pt-24"><CtaBand /></div>
    </>
  )
}
