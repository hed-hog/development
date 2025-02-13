import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'Por favor, insira um nome válido.' })
  name: string;

  @IsNumber(
    {},
    {
      message:
        'Por favor, forneça um número de identificação de usuário válido.',
    },
  )
  user_id: number;

  @IsNumber(
    {},
    {
      message: 'Por favor, forneça um número de identificação de bolsa válido.',
    },
  )
  stock_exchange_id: number;

  @IsNumber(
    {},
    {
      message:
        'Por favor, forneça um número de identificação de estratégia válido.',
    },
  )
  strategy_id: number;

  @IsNumber({}, { message: 'Por favor, insira um valor de saldo válido.' })
  balance: number;
}
