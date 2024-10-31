import { FileProviderTranslations } from './FileProviderTranslations'
import { Files } from './Files'

export type FileProviders = {
  id?: number
  slug: string
  created_at?: string
  updated_at?: string
  files?: Files[]
  file_provider_locale?: FileProviderTranslations[]
  name?: string
}
