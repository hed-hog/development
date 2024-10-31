import { IsInt, IsOptional } from 'class-validator';

export class UpdateDTO {
  @IsInt()
  @IsOptional()
  payment_id?: number;

  @IsInt()
  @IsOptional()
  subscription_id?: number;
}
