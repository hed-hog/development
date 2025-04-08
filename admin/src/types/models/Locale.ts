import { CategoryLocale } from './CategoryLocale'
import { ComponentPropTypeLocale } from './ComponentPropTypeLocale'
import { ComponentTypeLocale } from './ComponentTypeLocale'
import { ContentLocale } from './ContentLocale'
import { CountryLocale } from './CountryLocale'
import { DashboardComponentLocale } from './DashboardComponentLocale'
import { DashboardLocale } from './DashboardLocale'
import { FaqLocale } from './FaqLocale'
import { FileProviderLocale } from './FileProviderLocale'
import { MailLocale } from './MailLocale'
import { MenuLocale } from './MenuLocale'
import { MultifactorLocale } from './MultifactorLocale'
import { PaymentStatusLocale } from './PaymentStatusLocale'
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale'
import { PersonContactTypeLocale } from './PersonContactTypeLocale'
import { PersonCustomLocale } from './PersonCustomLocale'
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale'
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale'
import { RoleLocale } from './RoleLocale'
import { ScreenLocale } from './ScreenLocale'
import { SettingGroupLocale } from './SettingGroupLocale'
import { SettingLocale } from './SettingLocale'
import { SubscriptionCancelReasonLocale } from './SubscriptionCancelReasonLocale'
import { SubscriptionPlanLocale } from './SubscriptionPlanLocale'
import { TagLocale } from './TagLocale'
import { Translation } from './Translation'

export type Locale = {
  id?: number
  code: string
  region: string
  enabled?: boolean
  created_at?: string
  updated_at?: string
  file_provider_locale?: FileProviderLocale[]
  multifactor_locale?: MultifactorLocale[]
  setting_group_locale?: SettingGroupLocale[]
  dashboard_component_locale?: DashboardComponentLocale[]
  screen_locale?: ScreenLocale[]
  setting_locale?: SettingLocale[]
  translation?: Translation[]
  dashboard_locale?: DashboardLocale[]
  menu_locale?: MenuLocale[]
  role_locale?: RoleLocale[]
  category_locale?: CategoryLocale[]
  country_locale?: CountryLocale[]
  person_document_type_locale?: PersonDocumentTypeLocale[]
  person_contact_type_locale?: PersonContactTypeLocale[]
  person_address_type_locale?: PersonAddressTypeLocale[]
  person_custom_type_locale?: PersonCustomTypeLocale[]
  person_custom_locale?: PersonCustomLocale[]
  content_locale?: ContentLocale[]
  faq_locale?: FaqLocale[]
  mail_locale?: MailLocale[]
  component_prop_type_locale?: ComponentPropTypeLocale[]
  component_type_locale?: ComponentTypeLocale[]
  payment_status_locale?: PaymentStatusLocale[]
  subscription_plan_locale?: SubscriptionPlanLocale[]
  subscription_cancel_reason_locale?: SubscriptionCancelReasonLocale[]
  tag_locale_tag_locale_localeTolocale?: TagLocale[]
}
