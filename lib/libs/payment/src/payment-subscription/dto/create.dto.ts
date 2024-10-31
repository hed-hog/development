import { IsInt } from 'class-validator';

export class CreateDTO {
  @IsInt()
  payment_id: number;

  @IsInt()
  subscription_id: number;
}
