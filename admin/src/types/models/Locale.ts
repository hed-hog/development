import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';
import { PersonCustomLocale } from './PersonCustomLocale';
import { CountryLocale } from './CountryLocale';
import { ScreenLocale } from './ScreenLocale';
import { RoleLocale } from './RoleLocale';
import { Translation } from './Translation';
import { MenuLocale } from './MenuLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { SettingLocale } from './SettingLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  person_document_type_locale?: PersonDocumentTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
  country_locale?: CountryLocale[];
  screen_locale?: ScreenLocale[];
  role_locale?: RoleLocale[];
  translation?: Translation[];
  menu_locale?: MenuLocale[];
  person_type_locale?: PersonTypeLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  multifactor_locale?: MultifactorLocale[];
  file_provider_locale?: FileProviderLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  setting_group_locale?: SettingGroupLocale[];
  setting_locale?: SettingLocale[];
}