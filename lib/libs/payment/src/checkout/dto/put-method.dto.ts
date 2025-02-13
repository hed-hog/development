import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class PutMethodDTO {
  @IsInt({
    message: 'O ID do método de pagamento deve ser um número inteiro',
  })
  @IsNotEmpty({
    message: 'O ID do método de pagamento é obrigatório',
  })
  @IsPositive({
    message: 'O ID do método de pagamento deve ser um número positivo',
  })
  methodId: number;
}
