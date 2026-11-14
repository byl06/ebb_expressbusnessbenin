/**
 * Informations de l'entreprise.
 * Source : fiche GoAfricaOnline d'EXPRESS BUSINESS BÉNIN (EBB) — champs marqués « vérifié ».
 * Tout ce qui n'est pas vérifié est un contenu provisoire à faire valider par EBB.
 */
export const company = {
  name: 'Express Business Bénin',
  shortName: 'EBB',
  // Vérifié (fiche GoAfricaOnline)
  address: 'Dans la von entre la station Yatt & Co et le supermarché Africagel, Akassato',
  city: 'Abomey-Calavi, Bénin',
  phones: [
    { label: '(+229) 01 61 28 60 53', tel: '+2290161286053' },
    { label: '(+229) 01 44 80 04 35', tel: '+2290144800435' },
  ],
  // À CONFIRMER avec EBB : le numéro est-il bien actif sur WhatsApp ?
  whatsapp: '2290161286053',
  facebook: 'https://www.facebook.com/confiancemarche/',
  geo: { lat: 6.5118956, lng: 2.3639735 },
  hours: [
    { day: 'Lundi', value: '08h00 – 17h30' },
    { day: 'Mardi', value: '08h00 – 17h30' },
    { day: 'Mercredi', value: '08h00 – 17h30' },
    { day: 'Jeudi', value: '08h00 – 17h30' },
    { day: 'Vendredi', value: '08h00 – 17h30' },
    { day: 'Samedi', value: '08h00 – 15h00' },
    { day: 'Dimanche', value: 'Fermé' },
  ],
  // Champs à renseigner par EBB (mentions légales)
  legal: { rccm: '', ifu: '', director: '', host: 'À compléter' },
  // Mettre à false pour masquer les mentions « contenu provisoire » avant la mise en ligne
  showDraftNotes: true,
}

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${company.geo.lat}%2C${company.geo.lng}`
