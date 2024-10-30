import { UpdateLocalesDTO } from '@hedhog/admin/dto/update-locales';
import { IsString } from 'class-validator';

export class UpdateDTO extends UpdateLocalesDTO {
  @IsString()
  slug: string;
}
