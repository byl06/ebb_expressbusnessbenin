import { company } from '../data/company'

export function whatsappLink(message: string): string {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`
}
