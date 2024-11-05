import { IsString, IsBoolean } from 'class-validator';

export class CreateDTO {
  @IsString()
  code: string;

  @IsString()
  region: string;

  @IsBoolean()
  enabled: boolean;
}
