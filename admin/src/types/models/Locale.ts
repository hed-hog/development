import { MenuLocale } from './MenuLocale';
import { CountryLocale } from './CountryLocale';
import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';
import { PersonCustomLocale } from './PersonCustomLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';
import { SettingLocale } from './SettingLocale';
import { ScreenLocale } from './ScreenLocale';
import { RoleLocale } from './RoleLocale';
import { Translation } from './Translation';
import { PersonTypeLocale } from './PersonTypeLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  menu_locale?: MenuLocale[];
  country_locale?: CountryLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
  setting_group_locale?: SettingGroupLocale[];
  multifactor_locale?: MultifactorLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  file_provider_locale?: FileProviderLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  setting_locale?: SettingLocale[];
  screen_locale?: ScreenLocale[];
  role_locale?: RoleLocale[];
  translation?: Translation[];
  person_type_locale?: PersonTypeLocale[];
}