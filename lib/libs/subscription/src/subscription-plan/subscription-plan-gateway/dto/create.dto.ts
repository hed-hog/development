import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  gateway_id: number;

  @IsString()
  gateway_plan_id: string;
}
