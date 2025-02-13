import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class Setting {
  @IsString({ message: 'O slug deve ser em texto' })
  slug: string;

  @IsString({ message: 'O valor deve ser uma texto' })
  value: string;
}

export class CreateDTO {
  @IsArray({ message: 'As configurações devem ser uma lista' })
  @ValidateNested({ each: true })
  @Type(() => Setting)
  setting: Setting[];
}
