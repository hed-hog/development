import { IsString, Length, IsDecimal } from 'class-validator';

export class CreateDTO {
  @IsString()
  frequency: string;

  @IsString()
  @Length(0, 255)
  slug: string;

  @IsDecimal()
  price: number;
}
