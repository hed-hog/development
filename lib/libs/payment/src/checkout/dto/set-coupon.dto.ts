import { IsString } from 'class-validator';

export class SetCouponDTO {
  @IsString({ message: 'O código do cupom deve ser um texto' })
  code: string;

  @IsString({ message: 'O slug do pagamento deve ser um texto' })
  slug: string;
}
