/// <reference types="vite/client" />
interface ImportMetaEnv {
  /** URL d'un service de formulaire (ex. https://formspree.io/f/xxxx). Sans elle, la demande est transmise via WhatsApp. */
  readonly VITE_FORM_ENDPOINT?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
