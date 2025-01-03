import { MenuLocale } from './MenuLocale';
import { SettingLocale } from './SettingLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { ScreenLocale } from './ScreenLocale';
import { Translation } from './Translation';
import { RoleLocale } from './RoleLocale';
import { CountryLocale } from './CountryLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { FaqLocale } from './FaqLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  menu_locale?: MenuLocale[];
  setting_locale?: SettingLocale[];
  setting_group_locale?: SettingGroupLocale[];
  multifactor_locale?: MultifactorLocale[];
  screen_locale?: ScreenLocale[];
  translation?: Translation[];
  role_locale?: RoleLocale[];
  country_locale?: CountryLocale[];
  file_provider_locale?: FileProviderLocale[];
  person_type_locale?: PersonTypeLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  faq_locale?: FaqLocale[];
}