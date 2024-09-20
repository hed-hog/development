import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDTO {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'A url deve ser uma string' })
  @IsOptional()
  url?: string;

  @IsInt({ message: 'Order deve ser um número.' })
  @IsOptional()
  order?: number;

  @IsString({ message: 'O ícone deve ser uma string' })
  @IsOptional()
  icon?: string;
}
