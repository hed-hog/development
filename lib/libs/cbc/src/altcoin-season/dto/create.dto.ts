import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  @IsNotEmpty({ message: 'O índice de criptomoeda é obrigatório.' })
  altcoin_index: number;
}
