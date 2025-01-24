import { IsString, IsNumber } from 'class-validator';

export class CreateDTO {
  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
