import { Link } from 'react-router-dom'
import { MapPin, MessageCircle, Phone } from 'lucide-react'
import { Facebook } from './FacebookIcon'
import { company, directionsUrl } from '../data/company'
import { navLinks } from '../data/nav'
import { services } from '../data/services'
import { whatsappLink } from '../lib/contact'
import { Logo } from './Logo'

const h = 'mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold'
const a = 'text-sm text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

export function Footer() {
  return (
    <footer className="bg-navy pb-24 pt-16 text-white md:pb-10">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Immobilier, gestion immobilière, recrutement et services aux entreprises, depuis Abomey-Calavi.
            </p>
            <a
              href={whatsappLink('Bonjour EBB, je souhaite avoir des informations.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-gold px-5 text-sm font-semibold text-navy transition-colors hover:bg-[#d4b57b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Écrire sur WhatsApp
            </a>
          </div>

          <nav aria-label="Navigation du pied de page">
            <h2 className={h}>Navigation</h2>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}><Link to={l.to} className={a}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className={h}>Services</h2>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}><Link to={s.to} className={a}>{s.title}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={h}>Coordonnées</h2>
            <ul className="space-y-4 text-sm text-white/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span>
                  {company.address}
                  <br />{company.city}
                  <br />
                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">
                    Itinéraire
                  </a>
                </span>
              </li>
              {company.phones.map((p) => (
                <li key={p.tel} className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <a href={`tel:${p.tel}`} className="hover:text-white">{p.label}</a>
                </li>
              ))}
              <li className="flex gap-3">
                <Facebook className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href={company.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">Page Facebook</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Express Business Bénin. Tous droits réservés.</p>
          <Link to="/mentions-legales" className="underline-offset-4 hover:text-white hover:underline">Mentions légales</Link>
        </div>
      </div>
    </footer>
  )
}
