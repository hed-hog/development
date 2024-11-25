import { RoleLocale } from './RoleLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';
import { CountryLocale } from './CountryLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { Translation } from './Translation';
import { ScreenLocale } from './ScreenLocale';
import { SettingLocale } from './SettingLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';
import { PersonCustomLocale } from './PersonCustomLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  role_locale?: RoleLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
  country_locale?: CountryLocale[];
  setting_group_locale?: SettingGroupLocale[];
  person_type_locale?: PersonTypeLocale[];
  translation?: Translation[];
  screen_locale?: ScreenLocale[];
  setting_locale?: SettingLocale[];
  file_provider_locale?: FileProviderLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
}