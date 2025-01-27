import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsString()
  log: string;

  @IsNumber()
  gateway_id: number;
}
