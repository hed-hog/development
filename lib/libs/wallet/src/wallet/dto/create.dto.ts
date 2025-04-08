import { IsString, IsNumber } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsNumber()
  balance: number;
}
