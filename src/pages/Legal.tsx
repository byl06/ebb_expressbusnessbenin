import { PageHero } from '../components/PageHero'
import { DraftNote, Section } from '../components/Section'
import { company } from '../data/company'
import { useMeta } from '../lib/useMeta'

const todo = (v: string) => v || 'À compléter par EBB'

export default function Legal() {
  useMeta('Mentions légales', 'Mentions légales du site d’Express Business Bénin.')
  const blocks = [
    { t: 'Éditeur du site', c: [`${company.name} (${company.shortName})`, `${company.address}, ${company.city}`, `Téléphone : ${company.phones.map((p) => p.label).join(' / ')}`, `Responsable de la publication : ${todo(company.legal.director)}`, `RCCM : ${todo(company.legal.rccm)}`, `IFU : ${todo(company.legal.ifu)}`] },
    { t: 'Hébergement', c: [`Hébergeur : ${todo(company.legal.host)}`] },
    { t: 'Données personnelles', c: ['Les informations saisies dans les formulaires (nom, téléphone, e-mail, message) servent uniquement à répondre à votre demande. Elles ne sont ni vendues ni cédées à des tiers.', 'Pour exercer vos droits d’accès ou de suppression, contactez-nous aux coordonnées ci-dessus.'] },
    { t: 'Propriété intellectuelle', c: ['Les textes, logos et visuels de ce site sont la propriété d’Express Business Bénin ou utilisés avec autorisation. Toute reproduction sans accord préalable est interdite.'] },
    { t: 'Responsabilité', c: ['Les annonces et informations publiées sont données à titre indicatif et peuvent évoluer. Contactez EBB pour toute confirmation avant décision.'] },
  ]
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Mentions légales" />
      <Section>
        <div className="max-w-3xl space-y-10">
          {blocks.map((b) => (
            <div key={b.t}>
              <h2 className="font-display text-xl font-extrabold text-navy">{b.t}</h2>
              <div className="mt-3 space-y-2 leading-relaxed text-ink/80">{b.c.map((l) => <p key={l}>{l}</p>)}</div>
            </div>
          ))}
          <DraftNote>Texte indicatif : à compléter et à faire valider avant la mise en ligne.</DraftNote>
        </div>
      </Section>
    </>
  )
}
