import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2, MessageCircle, Phone } from 'lucide-react'
import { company } from '../data/company'
import { serviceOptions } from '../data/services'
import { whatsappLink } from '../lib/contact'
import { Button } from './Button'

type Values = {
  name: string; phone: string; email: string; service: string; subject: string
  message: string; date: string; slot: string; website: string
}
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'sending' | 'sent' | 'manual' | 'error'

const subjects = ['Demande d’information', 'Prise de rendez-vous', 'Demande de devis', 'Autre']
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

function validate(v: Values, variant: 'full' | 'inquiry'): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Indiquez votre nom complet.'
  const digits = v.phone.replace(/[\s.()-]/g, '')
  if (!/^\+?\d{8,15}$/.test(digits)) e.phone = 'Indiquez un numéro valide (8 à 15 chiffres, ex. +229 01 00 00 00 00).'
  if (variant === 'full' || v.email.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Indiquez une adresse e-mail valide (ex. nom@domaine.com).'
  }
  if (variant === 'full') {
    if (!v.service) e.service = 'Choisissez le service concerné.'
    if (!v.subject) e.subject = 'Précisez l’objet de votre demande.'
  }
  if (v.subject === 'Prise de rendez-vous' && !v.date) e.date = 'Choisissez la date souhaitée.'
  if (v.message.trim().length < 10) e.message = 'Votre message doit contenir au moins 10 caractères.'
  return e
}

const labelOf = (val: string) => serviceOptions.find((s) => s.value === val)?.label ?? val

function Field({ id, label, error, hint, required = true, children }: { id: string; label: string; error?: string; hint?: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required ? <span className="text-[#B42318]" aria-hidden>*</span> : <span className="font-normal text-ink/60">(facultatif)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink/60">{hint}</p>}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-[#B42318]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {error}
        </p>
      )}
    </div>
  )
}

const input = (err?: string) =>
  `block min-h-[48px] w-full rounded-md border bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 transition-colors focus:border-navy focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-gold ${
    err ? 'border-[#B42318]' : 'border-navy/25 hover:border-navy/50'
  }`

interface Props {
  variant?: 'full' | 'inquiry'
  defaultService?: string
  defaultSubject?: string
  defaultMessage?: string
  context?: string
}

export function ContactForm({ variant = 'full', defaultService = '', defaultSubject = '', defaultMessage = '', context }: Props) {
  const [v, setV] = useState<Values>({
    name: '', phone: '', email: '', service: defaultService, subject: defaultSubject || (variant === 'inquiry' ? 'Demande d’information' : ''),
    message: defaultMessage, date: '', slot: 'Matin', website: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const summaryRef = useRef<HTMLDivElement>(null)
  const [attempt, setAttempt] = useState(0)

  // Après un envoi invalide, le focus passe sur le résumé des erreurs (lecteurs d'écran + clavier)
  useEffect(() => {
    if (attempt > 0) summaryRef.current?.focus()
  }, [attempt])

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    const value = e.target.value
    setV((s) => ({ ...s, [k]: value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }
  const blur = (k: keyof Values) => () => {
    const er = validate(v, variant)[k]
    setErrors((s) => ({ ...s, [k]: er }))
  }
  const aria = (k: keyof Values) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${variant}-${k}-err` : undefined,
  })

  const waText = () =>
    [
      `Bonjour EBB, je m'appelle ${v.name}.`,
      context ? `Bien concerné : ${context}.` : v.service ? `Service : ${labelOf(v.service)}.` : '',
      v.subject ? `Objet : ${v.subject}${v.date ? ` (souhaité le ${v.date}, ${v.slot.toLowerCase()})` : ''}.` : '',
      v.message,
      `Mon téléphone : ${v.phone}${v.email ? ` – ${v.email}` : ''}`,
    ].filter(Boolean).join('\n')

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (v.website) return // anti-spam : champ piège rempli
    const er = validate(v, variant)
    setErrors(er)
    if (Object.keys(er).length) {
      setStatus('idle')
      setAttempt((n) => n + 1)
      return
    }
    if (!ENDPOINT) {
      setStatus('manual')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...v, service: labelOf(v.service), context, website: undefined }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent')
    return (
      <div role="status" className="rounded-lg border border-navy/10 bg-white p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold-dark" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-extrabold text-navy">Merci, votre demande est envoyée.</h3>
        <p className="mt-3 text-ink/75">Notre équipe vous recontactera dans les meilleurs délais, aux horaires d’ouverture.</p>
      </div>
    )

  if (status === 'manual')
    return (
      <div role="status" className="rounded-lg border border-navy/10 bg-white p-8 shadow-soft">
        <CheckCircle2 className="h-10 w-10 text-gold-dark" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-extrabold text-navy">Votre demande est prête.</h3>
        <p className="mt-3 text-ink/75">L’envoi automatique par formulaire n’est pas encore activé sur ce site. Transmettez votre demande en un geste, elle est déjà rédigée :</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappLink(waText())} external><MessageCircle className="h-4 w-4" aria-hidden /> Envoyer via WhatsApp</Button>
          <Button href={`tel:${company.phones[0].tel}`} variant="outline"><Phone className="h-4 w-4" aria-hidden /> Appeler EBB</Button>
        </div>
        <button type="button" onClick={() => setStatus('idle')} className="mt-5 text-sm font-medium text-navy-800 underline underline-offset-4">Modifier ma demande</button>
      </div>
    )

  const errList = (Object.entries(errors) as [keyof Values, string | undefined][]).filter(([, m]) => m)
  const full = variant === 'full'

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-lg border border-navy/10 bg-white p-6 shadow-soft sm:p-8" aria-label={full ? 'Formulaire de contact' : 'Demande d’informations'}>
      {errList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby="form-err-title" className="mb-6 rounded-md border border-[#B42318]/40 bg-[#FEF3F2] p-4 focus:outline focus:outline-2 focus:outline-[#B42318]">
          <h3 id="form-err-title" className="font-semibold text-[#B42318]">Veuillez corriger {errList.length > 1 ? 'ces champs' : 'ce champ'} :</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
            {errList.map(([k, m]) => (
              <li key={k}>
                <a href={`#${variant}-${k}`} className="font-medium text-[#B42318] underline underline-offset-2"
                  onClick={(e) => { e.preventDefault(); document.getElementById(`${variant}-${k}`)?.focus() }}>
                  {m}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {status === 'error' && (
        <p role="alert" className="mb-6 rounded-md border border-[#B42318]/40 bg-[#FEF3F2] p-4 text-sm text-[#B42318]">
          L’envoi a échoué. Réessayez, ou contactez-nous directement par téléphone ou WhatsApp.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${variant}-name`} label="Nom complet" error={errors.name}>
          <input id={`${variant}-name`} name="name" autoComplete="name" value={v.name} onChange={set('name')} onBlur={blur('name')} className={input(errors.name)} {...aria('name')} />
        </Field>
        <Field id={`${variant}-phone`} label="Téléphone" error={errors.phone} hint="Avec l’indicatif si possible, ex. +229 …">
          <input id={`${variant}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} onBlur={blur('phone')} className={input(errors.phone)} {...aria('phone')} />
        </Field>
        <div className={full ? '' : 'sm:col-span-2'}>
          <Field id={`${variant}-email`} label="Adresse e-mail" error={errors.email} required={full}>
            <input id={`${variant}-email`} name="email" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={set('email')} onBlur={blur('email')} className={input(errors.email)} {...aria('email')} />
          </Field>
        </div>
        {full && (
          <Field id={`${variant}-service`} label="Service concerné" error={errors.service}>
            <select id={`${variant}-service`} name="service" value={v.service} onChange={set('service')} onBlur={blur('service')} className={input(errors.service)} {...aria('service')}>
              <option value="">Choisir un service…</option>
              {serviceOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </Field>
        )}
        {full && (
          <div className="sm:col-span-2">
            <Field id={`${variant}-subject`} label="Objet de la demande" error={errors.subject}>
              <select id={`${variant}-subject`} name="subject" value={v.subject} onChange={set('subject')} onBlur={blur('subject')} className={input(errors.subject)} {...aria('subject')}>
                <option value="">Choisir un objet…</option>
                {subjects.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
        )}
        {v.subject === 'Prise de rendez-vous' && (
          <>
            <Field id={`${variant}-date`} label="Date souhaitée" error={errors.date}>
              <input id={`${variant}-date`} name="date" type="date" min={new Date().toISOString().slice(0, 10)} value={v.date} onChange={set('date')} onBlur={blur('date')} className={input(errors.date)} {...aria('date')} />
            </Field>
            <Field id={`${variant}-slot`} label="Créneau">
              <select id={`${variant}-slot`} name="slot" value={v.slot} onChange={set('slot')} className={input()}>
                <option>Matin</option><option>Après-midi</option>
              </select>
            </Field>
          </>
        )}
        <div className="sm:col-span-2">
          <Field id={`${variant}-message`} label="Message" error={errors.message}>
            <textarea id={`${variant}-message`} name="message" rows={5} value={v.message} onChange={set('message')} onBlur={blur('message')} className={`${input(errors.message)} resize-y`} {...aria('message')} />
          </Field>
        </div>
        {/* Champ piège anti-spam : invisible pour les humains */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Ne pas remplir <input tabIndex={-1} autoComplete="off" name="website" value={v.website} onChange={set('website')} /></label>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/60">Les champs marqués d’un <span aria-hidden>*</span> sont obligatoires.</p>
        <Button type="submit" arrow disabled={status === 'sending'} className="w-full sm:w-auto">
          {status === 'sending' ? 'Envoi en cours…' : full ? 'Envoyer ma demande' : 'Demander des informations'}
        </Button>
      </div>
    </form>
  )
}
