import { useEffect } from 'react'

const SITE = 'Express Business Bénin'

/** Titre, description et Open Graph propres à chaque page (SPA). */
export function useMeta(title: string, description: string) {
  useEffect(() => {
    const full = title ? `${title} | ${SITE}` : `${SITE} – Immobilier, gestion et recrutement`
    document.title = full
    const set = (sel: string, value: string) =>
      document.head.querySelector<HTMLMetaElement>(sel)?.setAttribute('content', value)
    set('meta[name="description"]', description)
    set('meta[property="og:title"]', full)
    set('meta[property="og:description"]', description)
  }, [title, description])
}
