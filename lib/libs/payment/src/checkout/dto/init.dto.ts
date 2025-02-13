import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class InitDTO {
  @IsString({
    message: 'Por favor, forneça um identificador válido para o slug.',
  })
  slug: string;

  @IsArray({ message: 'A lista de itens deve ser uma lista.' })
  @ArrayNotEmpty({ message: 'A lista de itens não pode estar vazia.' })
  @ArrayMinSize(1, {
    message: 'A lista de itens deve conter pelo menos um item.',
  })
  @IsInt({
    each: true,
    message: 'Cada item na lista deve ser um número inteiro.',
  })
  items: number[];

  @IsOptional()
  @IsString({ message: 'Por favor, forneça um código de cupom válido.' })
  coupon?: string;
}
