import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  user_id: number;
}
