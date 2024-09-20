import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsString({ message: 'O slug deve ser uma string' })
  @IsNotEmpty({ message: 'O slug é obrigatório.' })
  slug: string;

  @IsString({ message: 'A descrição deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  description: string;

  @IsString({ message: 'O ícone deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  icon?: string;
}
