import { IsString } from 'class-validator';
import { WithLocalesDTO } from '../../dto/with-locale.dto';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  slug: string;
}
