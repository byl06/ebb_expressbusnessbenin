import { MessageCircle, Phone } from 'lucide-react'
import { company } from '../data/company'
import { whatsappLink } from '../lib/contact'
import { Button } from './Button'
import { Reveal } from './Reveal'

export function CtaBand({ title = 'Vous avez un projet ? Échangeons ensemble.', text = 'Décrivez-nous votre besoin : immobilier, gestion, recrutement ou autre. Nous revenons vers vous.' }: { title?: string; text?: string }) {
  return (
    <section className="bg-white pb-16 sm:pb-24">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl bg-navy px-6 py-12 text-white sm:px-14 sm:py-16">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold/30" />
            <div aria-hidden className="absolute -right-10 -top-10 h-72 w-72 rounded-full border border-gold/15" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button to="/contact" arrow>Contacter notre équipe</Button>
                <Button href={`tel:${company.phones[0].tel}`} variant="outlineLight"><Phone className="h-4 w-4" aria-hidden /> Appeler</Button>
                <Button href={whatsappLink('Bonjour EBB, j’ai un projet et j’aimerais en discuter.')} external variant="outlineLight">
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
