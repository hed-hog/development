<<<<<<< HEAD
import { PersonTypeLocale } from './PersonTypeLocale';
import { Translation } from './Translation';
import { FileProviderLocale } from './FileProviderLocale';
=======
import { FileProviderLocale } from './FileProviderLocale';
import { PersonTypeLocale } from './PersonTypeLocale';
import { Translation } from './Translation';
>>>>>>> 8d7545cf68dbf82d55dae0aaa44593ea89db6933
import { ScreenLocale } from './ScreenLocale';
import { CountryLocale } from './CountryLocale';
import { SettingLocale } from './SettingLocale';
import { RoleLocale } from './RoleLocale';
import { MultifactorLocale } from './MultifactorLocale';
import { SettingGroupLocale } from './SettingGroupLocale';
import { MenuLocale } from './MenuLocale';
<<<<<<< HEAD
import { SettingGroupLocale } from './SettingGroupLocale';
=======
>>>>>>> 8d7545cf68dbf82d55dae0aaa44593ea89db6933
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';
import { PersonCustomLocale } from './PersonCustomLocale';
import { PaymentStatusLocale } from './PaymentStatusLocale';
import { EventLocale } from './EventLocale';

export type Locale = {
  id?: number;
  code: string;
  region: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
<<<<<<< HEAD
  person_type_locale?: PersonTypeLocale[];
  translation?: Translation[];
  file_provider_locale?: FileProviderLocale[];
=======
  file_provider_locale?: FileProviderLocale[];
  person_type_locale?: PersonTypeLocale[];
  translation?: Translation[];
>>>>>>> 8d7545cf68dbf82d55dae0aaa44593ea89db6933
  screen_locale?: ScreenLocale[];
  country_locale?: CountryLocale[];
  setting_locale?: SettingLocale[];
  role_locale?: RoleLocale[];
  multifactor_locale?: MultifactorLocale[];
  setting_group_locale?: SettingGroupLocale[];
  menu_locale?: MenuLocale[];
<<<<<<< HEAD
  setting_group_locale?: SettingGroupLocale[];
=======
>>>>>>> 8d7545cf68dbf82d55dae0aaa44593ea89db6933
  person_document_type_locale?: PersonDocumentTypeLocale[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom_locale?: PersonCustomLocale[];
  payment_status_locale?: PaymentStatusLocale[];
  event_locale?: EventLocale[];
}