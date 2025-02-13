import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber(
    {},
    { message: 'O ID do tipo de desconto é obrigatório e deve ser um número.' },
  )
  discount_type_id: number;

  @IsString({ message: 'O código do cupom é obrigatório e deve ser um texto.' })
  code: string;

  @IsOptional()
  @IsString({ message: 'A descrição do cupom deve ser um texto.' })
  description?: string;

  @IsString({ message: 'O valor do cupom é obrigatório e deve ser um texto.' })
  value: string;

  @IsOptional()
  @IsBoolean({ message: 'O status do cupom deve ser um booleano.' })
  active?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'O limite de usos do cupom deve ser um número.' })
  uses_limit?: number;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'A quantidade de usos do cupom deve ser um número.' },
  )
  uses_qtd?: number;

  @IsString({
    message:
      'A data de início do cupom é obrigatória e deve ser uma data no formato YYYY-MM-DD.',
  })
  starts_at: string;

  @IsOptional()
  @IsString({
    message:
      'A data de término do cupom deve ser uma data no formato YYYY-MM-DD.',
  })
  ends_at?: string;
}
