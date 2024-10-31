import { Locales } from './Locales'
import { TranslationNamespaces } from './TranslationNamespaces'

export type Translations = {
  id?: number
  locale_id: number
  namespace_id: number
  name: string
  value: string
  created_at?: string
  updated_at?: string
  locale?: Locales
  translation_namespaces?: TranslationNamespaces
}
