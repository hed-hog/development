import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  altcoinIndex: number;
}
