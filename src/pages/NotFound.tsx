import { Button } from '../components/Button'
import { Section } from '../components/Section'
import { useMeta } from '../lib/useMeta'

export default function NotFound() {
  useMeta('Page introuvable', 'La page demandée est introuvable sur le site d’Express Business Bénin.')
  return (
    <Section className="min-h-[60vh]">
      <p className="font-display text-sm font-bold tracking-[0.2em] text-gold-dark">ERREUR 404</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Cette page est introuvable.</h1>
      <p className="mt-4 max-w-lg text-lg text-ink/75">Le lien est peut-être incorrect, ou la page a été déplacée.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/" variant="navy" arrow>Retour à l’accueil</Button>
        <Button to="/immobilier" variant="outline">Voir les biens</Button>
      </div>
    </Section>
  )
}
