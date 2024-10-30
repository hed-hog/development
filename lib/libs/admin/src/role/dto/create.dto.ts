import { IsString } from 'class-validator';
import { WithLocalesDTO } from '../../dto/with-locales.dto';

export class CreateDTO extends WithLocalesDTO {
  @IsString()
  slug: string;
}
