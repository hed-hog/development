import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString()
  slug: string;

  @IsString()
  name: string;
}
