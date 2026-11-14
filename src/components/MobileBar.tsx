import { MessageCircle, Phone } from 'lucide-react'
import { company } from '../data/company'
import { whatsappLink } from '../lib/contact'

/** Barre d'actions toujours accessible sur mobile : appel + WhatsApp. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a
          href={`tel:${company.phones[0].tel}`}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-navy text-[15px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          <Phone className="h-4 w-4" aria-hidden /> Appeler
        </a>
        <a
          href={whatsappLink('Bonjour EBB, je souhaite avoir des informations.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-gold text-[15px] font-semibold text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
        </a>
      </div>
    </div>
  )
}
