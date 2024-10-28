import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Setting {
  @IsString()
  slug: string;

  @IsString()
  value: string;
}

export class SettingsDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Setting)
  settings: Setting[];
}
