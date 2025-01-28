import { CountryLocale } from './CountryLocale'
import { EventLocale } from './EventLocale'
import { FileProviderLocale } from './FileProviderLocale'
import { MenuLocale } from './MenuLocale'
import { MultifactorLocale } from './MultifactorLocale'
import { PaymentStatusLocale } from './PaymentStatusLocale'
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale'
import { PersonContactTypeLocale } from './PersonContactTypeLocale'
import { PersonCustomLocale } from './PersonCustomLocale'
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale'
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale'
import { PersonTypeLocale } from './PersonTypeLocale'
import { RoleLocale } from './RoleLocale'
import { ScreenLocale } from './ScreenLocale'
import { SettingGroupLocale } from './SettingGroupLocale'
import { SettingLocale } from './SettingLocale'
import { Translation } from './Translation'

export type Locale = {
  id?: number
  code: string
  region: string
  enabled?: boolean
  created_at?: string
  updated_at?: string
  file_provider_locale?: FileProviderLocale[]
  person_type_locale?: PersonTypeLocale[]
  translation?: Translation[]
  screen_locale?: ScreenLocale[]
  country_locale?: CountryLocale[]
  setting_locale?: SettingLocale[]
  role_locale?: RoleLocale[]
  multifactor_locale?: MultifactorLocale[]
  setting_group_locale?: SettingGroupLocale[]
  menu_locale?: MenuLocale[]
  person_document_type_locale?: PersonDocumentTypeLocale[]
  person_contact_type_locale?: PersonContactTypeLocale[]
  person_address_type_locale?: PersonAddressTypeLocale[]
  person_custom_type_locale?: PersonCustomTypeLocale[]
  person_custom_locale?: PersonCustomLocale[]
  payment_status_locale?: PaymentStatusLocale[]
  event_locale?: EventLocale[]
}
