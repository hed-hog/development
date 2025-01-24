import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  amount: number;

  @IsString()
  currency: string;
}
