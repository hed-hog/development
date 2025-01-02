import { IsOptional, IsString } from 'class-validator';

export class UpdateDTO {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'O slug deve ser uma string' })
  slug?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'O ícone deve ser uma string' })
  icon?: string;
}
