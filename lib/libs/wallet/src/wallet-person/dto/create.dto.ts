import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  wallet_id: number;

  @IsNumber()
  person_id: number;
}
