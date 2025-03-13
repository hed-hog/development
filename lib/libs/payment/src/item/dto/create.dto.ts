import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'O slug deve ser um texto' })
  slug: string;

  @IsString({ message: 'O nome deve ser um texto' })
  name: string;

  @IsNumber({}, { message: 'O preço deve ser um número' })
  price: number;

  @IsInt({ each: true })
  coupon_ids: number[];
}
