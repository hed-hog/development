import { MultifactorTranslations } from './MultifactorTranslations'
import { Users } from './Users'

export type Multifactors = {
  id?: number
  slug: string
  created_at?: string
  updated_at?: string
  users?: Users[]
  multifactor_locale?: MultifactorTranslations[]
  name?: string
}
