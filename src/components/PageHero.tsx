import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function PageHero({ eyebrow, title, text, children }: { eyebrow: string; title: string; text?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute -right-32 top-1/2 hidden h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border border-gold/20 lg:block" />
      <div aria-hidden className="absolute -right-12 top-1/2 hidden h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border border-gold/10 lg:block" />
      <div className="relative mx-auto max-w-page px-5 py-16 sm:px-8 sm:py-24">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{text}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  )
}
