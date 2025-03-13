import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString()
  slug: string;

  @IsString()
  subject: string;

  @IsString()
  body: string;
}
