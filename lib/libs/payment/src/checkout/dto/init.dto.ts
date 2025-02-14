import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class InitDTO {
  @IsOptional()
  @IsString({
    message: 'Por favor, forneça um identificador válido para o slug.',
  })
  slug: string;

  @IsOptional()
  @IsArray({ message: 'A lista de itens deve ser uma lista.' })
  @IsInt({
    each: true,
    message: 'Cada item na lista deve ser um número inteiro.',
  })
  items: number[];

  @IsOptional()
  @IsString({ message: 'Por favor, forneça um código de cupom válido.' })
  coupon?: string;
}
