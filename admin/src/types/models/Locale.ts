import { MenuLocale } from './MenuLocale';
import { ScreenLocale } from './ScreenLocale';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';
import { FaqLocale } from './FaqLocale';
import { MailLocale } from './MailLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { PersonCustomLocale } from './PersonCustomLocale';
import { PaymentStatusLocale } from './PaymentStatusLocale';
import { SettingLocale } from './SettingLocale';
import { CategoryLocale } from './CategoryLocale';
import { DashboardComponentLocale } from './DashboardComponentLocale';
import { RoleLocale } from './RoleLocale';
import { CountryLocale } from './CountryLocale';
import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { TagLocale } from './TagLocale';
import { DashboardLocale } from './DashboardLocale';
import { Translation } from './Translation';
import { ComponentPropTypeLocale } from './ComponentPropTypeLocale';
import { ComponentTypeLocale } from './ComponentTypeLocale';
import { SubscriptionPlanLocale } from './SubscriptionPlanLocale';
import { SubscriptionCancelReasonLocale } from './SubscriptionCancelReasonLocale';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';
import { ContentLocale } from './ContentLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonTypeLocale } from './PersonTypeLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  menu_locale?: MenuLocale[];
  screen_locale?: ScreenLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  faq_locale?: FaqLocale[];
  mail_locale?: MailLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  multifactor_locale?: MultifactorLocale[];
  setting_group_locale?: SettingGroupLocale[];
  person_custom_locale?: PersonCustomLocale[];
  payment_status_locale?: PaymentStatusLocale[];
  setting_locale?: SettingLocale[];
  category_locale?: CategoryLocale[];
  dashboard_component_locale?: DashboardComponentLocale[];
  role_locale?: RoleLocale[];
  country_locale?: CountryLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  tag_locale?: TagLocale[];
  dashboard_locale?: DashboardLocale[];
  translation?: Translation[];
  component_prop_type_locale?: ComponentPropTypeLocale[];
  component_type_locale?: ComponentTypeLocale[];
  subscription_plan_locale?: SubscriptionPlanLocale[];
  subscription_cancel_reason_locale?: SubscriptionCancelReasonLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  content_locale?: ContentLocale[];
  file_provider_locale?: FileProviderLocale[];
  person_type_locale?: PersonTypeLocale[];
}