import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { Translation } from './Translation';
import { MenuLocale } from './MenuLocale';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { CountryLocale } from './CountryLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';
import { PersonCustomLocale } from './PersonCustomLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { ScreenLocale } from './ScreenLocale';
import { RoleLocale } from './RoleLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { SettingLocale } from './SettingLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  person_contact_type_locale?: PersonContactTypeLocale[];
  translation?: Translation[];
  menu_locale?: MenuLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  multifactor_locale?: MultifactorLocale[];
  country_locale?: CountryLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
  file_provider_locale?: FileProviderLocale[];
  screen_locale?: ScreenLocale[];
  role_locale?: RoleLocale[];
  person_type_locale?: PersonTypeLocale[];
  setting_group_locale?: SettingGroupLocale[];
  setting_locale?: SettingLocale[];
}