import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}
