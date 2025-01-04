import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsString()
  slug: string;
}
