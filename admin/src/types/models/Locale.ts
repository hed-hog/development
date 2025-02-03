import { FileProviderLocale } from './FileProviderLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { Translation } from './Translation';
import { ScreenLocale } from './ScreenLocale';
import { CountryLocale } from './CountryLocale';
import { SettingLocale } from './SettingLocale';
import { RoleLocale } from './RoleLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MenuLocale } from './MenuLocale';
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
  file_provider_locale?: FileProviderLocale[];
  person_type_locale?: PersonTypeLocale[];
  translation?: Translation[];
  screen_locale?: ScreenLocale[];
  country_locale?: CountryLocale[];
  setting_locale?: SettingLocale[];
  role_locale?: RoleLocale[];
  multifactor_locale?: MultifactorLocale[];
  setting_group_locale?: SettingGroupLocale[];
  menu_locale?: MenuLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
}