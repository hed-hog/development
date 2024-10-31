import { CountryTranslations } from './CountryTranslations'
import { FileProviderTranslations } from './FileProviderTranslations'
import { MenuTranslations } from './MenuTranslations'
import { MultifactorTranslations } from './MultifactorTranslations'
import { PersonAddressTypeTranslations } from './PersonAddressTypeTranslations'
import { PersonContactTypeTranslations } from './PersonContactTypeTranslations'
import { PersonCustomTranslations } from './PersonCustomTranslations'
import { PersonCustomTypeTranslations } from './PersonCustomTypeTranslations'
import { PersonDocumentTypeTranslations } from './PersonDocumentTypeTranslations'
import { PersonTypeTranslations } from './PersonTypeTranslations'
import { RoleTranslations } from './RoleTranslations'
import { ScreenTranslations } from './ScreenTranslations'
import { SettingGroupTranslations } from './SettingGroupTranslations'
import { SettingTranslations } from './SettingTranslations'
import { Translations } from './Translations'

export type Locales = {
  id?: number
  code: string
  region: string
  enabled?: boolean
  created_at?: string
  updated_at?: string
  setting_group_locale?: SettingGroupTranslations[]
  person_type_locale?: PersonTypeTranslations[]
  person_document_type_locale?: PersonDocumentTypeTranslations[]
  person_contact_type_locale?: PersonContactTypeTranslations[]
  country_locale?: CountryTranslations[]
  screen_locale?: ScreenTranslations[]
  translations?: Translations[]
  setting_locale?: SettingTranslations[]
  role_locale?: RoleTranslations[]
  file_provider_locale?: FileProviderTranslations[]
  multifactor_locale?: MultifactorTranslations[]
  menu_locale?: MenuTranslations[]
  person_address_type_locale?: PersonAddressTypeTranslations[]
  person_custom_type_locale?: PersonCustomTypeTranslations[]
  person_custom_locale?: PersonCustomTranslations[]
}
