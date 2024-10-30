import { PersonDocumentTypeTranslations } from './PersonDocumentTypeTranslations';
import { SettingGroupTranslations } from './SettingGroupTranslations';
import { PersonTypeTranslations } from './PersonTypeTranslations';
import { PersonContactTypeTranslations } from './PersonContactTypeTranslations';
import { CountryTranslations } from './CountryTranslations';
import { ScreenTranslations } from './ScreenTranslations';
import { Translations } from './Translations';
import { SettingTranslations } from './SettingTranslations';
import { RoleTranslations } from './RoleTranslations';
import { FileProviderTranslations } from './FileProviderTranslations';
import { MultifactorTranslations } from './MultifactorTranslations';
import { MenuTranslations } from './MenuTranslations';
import { PersonAddressTypeTranslations } from './PersonAddressTypeTranslations';
import { PersonCustomTypeTranslations } from './PersonCustomTypeTranslations';
import { PersonCustomTranslations } from './PersonCustomTranslations';

export type Locales = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  person_document_type_translations?: PersonDocumentTypeTranslations[];
  setting_group_translations?: SettingGroupTranslations[];
  person_type_translations?: PersonTypeTranslations[];
  person_contact_type_translations?: PersonContactTypeTranslations[];
  country_translations?: CountryTranslations[];
  screen_translations?: ScreenTranslations[];
  translations?: Translations[];
  setting_translations?: SettingTranslations[];
  role_translations?: RoleTranslations[];
  file_provider_translations?: FileProviderTranslations[];
  multifactor_translations?: MultifactorTranslations[];
  menu_translations?: MenuTranslations[];
  person_address_type_translations?: PersonAddressTypeTranslations[];
  person_custom_type_translations?: PersonCustomTypeTranslations[];
  person_custom_translations?: PersonCustomTranslations[];
}