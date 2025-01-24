import { CountryLocale } from './CountryLocale';
import { EventLocale } from './EventLocale';
import { FaqLocale } from './FaqLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { MenuLocale } from './MenuLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { PaymentStatusLocale } from './PaymentStatusLocale';
import { SettingLocale } from './SettingLocale';
import { RoleLocale } from './RoleLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { ScreenLocale } from './ScreenLocale';
import { Translation } from './Translation';
import { PersonTypeLocale } from './PersonTypeLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  country_locale?: CountryLocale[];
  event_locale?: EventLocale[];
  faq_locale?: FaqLocale[];
  file_provider_locale?: FileProviderLocale[];
  menu_locale?: MenuLocale[];
  multifactor_locale?: MultifactorLocale[];
  payment_status_locale?: PaymentStatusLocale[];
  setting_locale?: SettingLocale[];
  role_locale?: RoleLocale[];
  setting_group_locale?: SettingGroupLocale[];
  screen_locale?: ScreenLocale[];
  translation?: Translation[];
  person_type_locale?: PersonTypeLocale[];
}