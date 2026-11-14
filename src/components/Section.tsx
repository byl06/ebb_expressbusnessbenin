import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { company } from '../data/company'

export function Section({
  children, className = '', tone = 'white', id,
}: { children: ReactNode; className?: string; tone?: 'white' | 'mist' | 'navy'; id?: string }) {
  const bg = tone === 'navy' ? 'bg-navy text-white' : tone === 'mist' ? 'bg-mist' : 'bg-white'
  return (
    <section id={id} className={`${bg} py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-page px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function SectionHead({
  eyebrow, title, text, tone = 'light', align = 'left',
}: { eyebrow?: string; title: string; text?: string; tone?: 'light' | 'dark'; align?: 'left' | 'center' }) {
  const dark = tone === 'dark'
  return (
    <Reveal className={`mb-10 max-w-2xl sm:mb-14 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${dark ? 'text-gold' : 'text-gold-dark'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-white/75' : 'text-ink/75'}`}>{text}</p>}
    </Reveal>
  )
}

export function DraftNote({ children }: { children: ReactNode }) {
  if (!company.showDraftNotes) return null
  return (
    <p className="mt-8 text-xs text-ink/60">
      <span className="mr-2 rounded-sm border border-gold-dark/40 px-1.5 py-0.5 font-semibold uppercase tracking-wide text-gold-dark">
        Contenu provisoire
      </span>
      {children}
    </p>
  )
}
