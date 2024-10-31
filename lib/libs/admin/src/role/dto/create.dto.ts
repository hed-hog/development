import { IsString } from 'class-validator';
import { WithLocaleDTO } from '../../dto/with-locale.dto';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  slug: string;
}
