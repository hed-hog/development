import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  region: string;
}
