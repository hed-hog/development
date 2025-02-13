import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'O slug é obrigatório e deve ser um texto.' })
  slug: string;

  @IsOptional()
  @IsNumber({}, { message: 'O ID da pessoa deve ser um número.' })
  person_id?: number;

  @IsNumber(
    {},
    { message: 'O ID da gateway é obrigatório e deve ser um número.' },
  )
  gateway_id: number;

  @IsNumber({}, { message: 'O valor é obrigatório e deve ser um número.' })
  amount: number;

  @IsNumber({}, { message: 'O status é obrigatório e deve ser um número.' })
  status_id: number;

  @IsOptional()
  @IsString({ message: 'O documento deve ser um texto.' })
  document?: string;

  @IsOptional()
  @IsString({
    message: 'A data de pagamento deve ser uma data no formato YYYY-MM-DD.',
  })
  payment_at?: string;

  @IsString({ message: 'A moeda é obrigatória e deve ser um texto.' })
  currency: string;

  @IsOptional()
  @IsNumber({}, { message: 'O ID do método de pagamento deve ser um número.' })
  method_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O ID da bandeira deve ser um número.' })
  brand_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'A quantidade de parcelas deve ser um número.' })
  installments?: number;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'A quantidade de itens entregues deve ser um número.' },
  )
  delivered?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O ID do cupom deve ser um número.' })
  coupon_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O desconto deve ser um número.' })
  discount?: number;
}
