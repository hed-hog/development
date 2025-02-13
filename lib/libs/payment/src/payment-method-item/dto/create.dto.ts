import { IsNumber, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber(
    {},
    {
      message:
        'O ID do método de pagamento é obrigatório e deve ser um número.',
    },
  )
  payment_method_id: number;

  @IsNumber({}, { message: 'O ID do item é obrigatório e deve ser um número.' })
  item_id: number;

  @IsNumber(
    {},
    { message: 'O ID do tipo de desconto é obrigatório e deve ser um número.' },
  )
  discount_type_id: number;

  @IsOptional()
  @IsNumber({}, { message: 'O valor do desconto deve ser um número.' })
  value?: number;
}
