import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsString({ message: 'A descrição deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  description: string;
}
