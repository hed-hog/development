import { UpdateLocalesDTO } from '../../dto/update-locales';
import { IsString } from 'class-validator';

export class UpdateDTO extends UpdateLocalesDTO {
  @IsString()
  slug: string;
}
