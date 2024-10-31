import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class Setting {
  @IsString()
  slug: string;

  @IsString()
  value: string;
}

export class SettingDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Setting)
  setting: Setting[];
}
