import { Translation } from './Translation';
import { ScreenLocale } from './ScreenLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';
import { RoleLocale } from './RoleLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { SettingLocale } from './SettingLocale';
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
  translation?: Translation[];
  screen_locale?: ScreenLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  setting_group_locale?: SettingGroupLocale[];
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
  role_locale?: RoleLocale[];
  file_provider_locale?: FileProviderLocale[];
  person_type_locale?: PersonTypeLocale[];
  setting_locale?: SettingLocale[];
  country_locale?: CountryLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
}