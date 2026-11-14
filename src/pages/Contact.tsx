import { MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { Facebook } from '../components/FacebookIcon'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { company, directionsUrl } from '../data/company'
import { serviceOptions } from '../data/services'
import { whatsappLink } from '../lib/contact'
import { useMeta } from '../lib/useMeta'

export default function Contact() {
  useMeta('Contact', 'Contactez Express Business Bénin à Akassato, Abomey-Calavi : téléphone, WhatsApp, formulaire de contact et demande de rendez-vous.')
  const [params] = useSearchParams()
  const q = params.get('service') ?? ''
  const service = serviceOptions.some((s) => s.value === q) ? q : ''
  const today = (new Date().getDay() + 6) % 7 // lundi = 0

  return (
    <>
      <PageHero eyebrow="Contact" title="Parlons de votre projet." text="Appelez-nous, écrivez-nous sur WhatsApp ou envoyez votre demande : nous vous répondrons aux horaires d’ouverture." />
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <h2 className="mb-6 font-display text-2xl font-extrabold text-navy">Envoyer une demande</h2>
            <ContactForm key={service} defaultService={service} defaultSubject={q ? 'Demande d’information' : ''} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-navy/10 bg-white p-6 shadow-soft">
              <h2 className="font-display text-xl font-extrabold text-navy">Coordonnées</h2>
              <ul className="mt-5 space-y-4 text-[15px] text-ink/80">
                <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden /><span>{company.address}<br />{company.city}</span></li>
                {company.phones.map((p) => (
                  <li key={p.tel} className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden /><a href={`tel:${p.tel}`} className="font-medium text-navy underline-offset-4 hover:underline">{p.label}</a></li>
                ))}
                <li className="flex gap-3"><Facebook className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden /><a href={company.facebook} target="_blank" rel="noopener noreferrer" className="font-medium text-navy underline-offset-4 hover:underline">Page Facebook</a></li>
              </ul>
              <div className="mt-6 grid gap-3">
                <Button href={whatsappLink('Bonjour EBB, je souhaite avoir des informations.')} external><MessageCircle className="h-4 w-4" aria-hidden /> Écrire sur WhatsApp</Button>
                <Button href={directionsUrl} external variant="outline"><Navigation className="h-4 w-4" aria-hidden /> Itinéraire</Button>
              </div>
            </div>

            <div className="rounded-lg border border-navy/10 bg-white p-6 shadow-soft">
              <h2 className="font-display text-xl font-extrabold text-navy">Horaires d’ouverture</h2>
              <table className="mt-4 w-full text-[15px]">
                <caption className="sr-only">Horaires d’ouverture par jour</caption>
                <tbody>
                  {company.hours.map((h, i) => (
                    <tr key={h.day} className={`border-b border-navy/10 last:border-0 ${i === today ? 'font-semibold text-navy' : 'text-ink/75'}`}>
                      <th scope="row" className="py-2.5 text-left font-[inherit]">{h.day}{i === today && <span className="ml-2 rounded-sm bg-gold px-1.5 py-0.5 text-[10px] font-bold uppercase text-navy">Aujourd’hui</span>}</th>
                      <td className="py-2.5 text-right">{h.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
