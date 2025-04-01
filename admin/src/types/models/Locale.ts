import { DashboardLocale } from './DashboardLocale';
import { ScreenLocale } from './ScreenLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { Translation } from './Translation';
import { RoleLocale } from './RoleLocale';
import { SettingLocale } from './SettingLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';
import { DashboardComponentLocale } from './DashboardComponentLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { CountryLocale } from './CountryLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';
import { PersonCustomLocale } from './PersonCustomLocale';
import { ContentLocale } from './ContentLocale';
import { FaqLocale } from './FaqLocale';
import { MailLocale } from './MailLocale';
import { ComponentPropTypeLocale } from './ComponentPropTypeLocale';
import { ComponentTypeLocale } from './ComponentTypeLocale';
import { PaymentStatusLocale } from './PaymentStatusLocale';
import { SubscriptionPlanLocale } from './SubscriptionPlanLocale';
import { SubscriptionCancelReasonLocale } from './SubscriptionCancelReasonLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  dashboard_locale?: DashboardLocale[];
  screen_locale?: ScreenLocale[];
  setting_group_locale?: SettingGroupLocale[];
  translation?: Translation[];
  role_locale?: RoleLocale[];
  setting_locale?: SettingLocale[];
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
  dashboard_component_locale?: DashboardComponentLocale[];
  file_provider_locale?: FileProviderLocale[];
  country_locale?: CountryLocale[];
  person_type_locale?: PersonTypeLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
  content_locale?: ContentLocale[];
  faq_locale?: FaqLocale[];
  mail_locale?: MailLocale[];
  component_prop_type_locale?: ComponentPropTypeLocale[];
  component_type_locale?: ComponentTypeLocale[];
  payment_status_locale?: PaymentStatusLocale[];
  subscription_plan_locale?: SubscriptionPlanLocale[];
  subscription_cancel_reason_locale?: SubscriptionCancelReasonLocale[];
}