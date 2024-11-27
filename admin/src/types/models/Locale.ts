import { MultifactorLocale } from './MultifactorLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { ScreenLocale } from './ScreenLocale';
import { RoleLocale } from './RoleLocale';
import { Translation } from './Translation';
import { SettingLocale } from './SettingLocale';
import { MenuLocale } from './MenuLocale';
import { CountryLocale } from './CountryLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { PersonCustomLocale } from './PersonCustomLocale';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  multifactor_locale?: MultifactorLocale[];
  setting_group_locale?: SettingGroupLocale[];
  screen_locale?: ScreenLocale[];
  role_locale?: RoleLocale[];
  translation?: Translation[];
  setting_locale?: SettingLocale[];
  menu_locale?: MenuLocale[];
  country_locale?: CountryLocale[];
  file_provider_locale?: FileProviderLocale[];
  person_type_locale?: PersonTypeLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
}