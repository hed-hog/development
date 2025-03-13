<<<<<<< HEAD
import { MenuLocale } from './MenuLocale';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';
import { CountryLocale } from './CountryLocale';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { FileProviderLocale } from './FileProviderLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { SettingLocale } from './SettingLocale';
import { ScreenLocale } from './ScreenLocale';
import { RoleLocale } from './RoleLocale';
import { Translation } from './Translation';
import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';
import { PersonCustomLocale } from './PersonCustomLocale';
=======
import { ComponentPropTypeLocale } from './ComponentPropTypeLocale';
import { Translation } from './Translation';
import { ScreenLocale } from './ScreenLocale';
import { ComponentTypeLocale } from './ComponentTypeLocale';
import { RoleLocale } from './RoleLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { MenuLocale } from './MenuLocale';
>>>>>>> d3c54c9c54ecdc722c1781fce343d8716608f045

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
<<<<<<< HEAD
  menu_locale?: MenuLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  country_locale?: CountryLocale[];
  person_document_type_locale?: PersonDocumentTypeLocale[];
  setting_group_locale?: SettingGroupLocale[];
  multifactor_locale?: MultifactorLocale[];
  file_provider_locale?: FileProviderLocale[];
  person_type_locale?: PersonTypeLocale[];
  setting_locale?: SettingLocale[];
  screen_locale?: ScreenLocale[];
  role_locale?: RoleLocale[];
  translation?: Translation[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
=======
  component_prop_type_locale?: ComponentPropTypeLocale[];
  translation?: Translation[];
  screen_locale?: ScreenLocale[];
  component_type_locale?: ComponentTypeLocale[];
  role_locale?: RoleLocale[];
  multifactor_locale?: MultifactorLocale[];
  menu_locale?: MenuLocale[];
>>>>>>> d3c54c9c54ecdc722c1781fce343d8716608f045
}