import { Translation } from './Translation';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MenuLocale } from './MenuLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { PersonCustomLocale } from './PersonCustomLocale';
import { SettingLocale } from './SettingLocale';
import { CountryLocale } from './CountryLocale';
import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { ScreenLocale } from './ScreenLocale';
import { RoleLocale } from './RoleLocale';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  translation?: Translation[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  setting_group_locale?: SettingGroupLocale[];
  menu_locale?: MenuLocale[];
  multifactor_locale?: MultifactorLocale[];
  file_provider_locale?: FileProviderLocale[];
  person_type_locale?: PersonTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
  setting_locale?: SettingLocale[];
  country_locale?: CountryLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  screen_locale?: ScreenLocale[];
  role_locale?: RoleLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
}