import { WithLocaleDTO } from '@hedhog/admin';
import { IsString } from 'class-validator';

export class CreatePersonTypeDTO extends WithLocaleDTO {
  @IsString()
  slug: string;
}
