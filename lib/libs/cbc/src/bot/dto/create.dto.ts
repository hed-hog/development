import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  cookies: string;
}
