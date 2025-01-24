import { Translation } from './Translation';
import { ScreenLocale } from './ScreenLocale';
import { CountryLocale } from './CountryLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';
import { PersonCustomLocale } from './PersonCustomLocale';
import { RoleLocale } from './RoleLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';
import { SettingLocale } from './SettingLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  translation?: Translation[];
  screen_locale?: ScreenLocale[];
  country_locale?: CountryLocale[];
  setting_group_locale?: SettingGroupLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
  role_locale?: RoleLocale[];
  file_provider_locale?: FileProviderLocale[];
  person_type_locale?: PersonTypeLocale[];
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
  setting_locale?: SettingLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
}