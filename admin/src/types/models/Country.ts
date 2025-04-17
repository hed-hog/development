<<<<<<< HEAD
import { CountryLocale } from './CountryLocale';
import { PersonDocumentType } from './PersonDocumentType';
import { PersonDocument } from './PersonDocument';
=======
import { PersonDocumentType } from './PersonDocumentType';
import { PersonDocument } from './PersonDocument';
import { CountryLocale } from './CountryLocale';
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
import { PersonAddress } from './PersonAddress';

export type Country = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
<<<<<<< HEAD
  country_locale?: CountryLocale[];
  person_document_type?: PersonDocumentType[];
  person_document?: PersonDocument[];
=======
  person_document_type?: PersonDocumentType[];
  person_document?: PersonDocument[];
  country_locale?: CountryLocale[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
  person_address?: PersonAddress[];
  name?: string;
}