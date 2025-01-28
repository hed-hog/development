import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  altcoin_index: number;
}
