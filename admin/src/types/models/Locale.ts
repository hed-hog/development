import { ScreenLocale } from './ScreenLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { Translation } from './Translation';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';
import { RoleLocale } from './RoleLocale';
import { SettingLocale } from './SettingLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { CountryLocale } from './CountryLocale';
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
  screen_locale?: ScreenLocale[];
  file_provider_locale?: FileProviderLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  translation?: Translation[];
  setting_group_locale?: SettingGroupLocale[];
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
  role_locale?: RoleLocale[];
  setting_locale?: SettingLocale[];
  person_type_locale?: PersonTypeLocale[];
  country_locale?: CountryLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
}