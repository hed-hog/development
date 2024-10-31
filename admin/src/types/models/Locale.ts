import { MenuLocale } from './MenuLocale';
import { CountryLocale } from './CountryLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { RoleLocale } from './RoleLocale';
import { ScreenLocale } from './ScreenLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { SettingLocale } from './SettingLocale';
import { Translation } from './Translation';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
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
  menu_locale?: MenuLocale[];
  country_locale?: CountryLocale[];
  multifactor_locale?: MultifactorLocale[];
  role_locale?: RoleLocale[];
  screen_locale?: ScreenLocale[];
  setting_group_locale?: SettingGroupLocale[];
  setting_locale?: SettingLocale[];
  translation?: Translation[];
  file_provider_locale?: FileProviderLocale[];
  person_type_locale?: PersonTypeLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
}