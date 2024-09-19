import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsString({ message: 'A url deve ser uma string' })
  @IsNotEmpty({ message: 'A url é obrigatório.' })
  url: string;

  @IsInt({ message: 'Order deve ser um número.' })
  @Min(1)
  @IsOptional()
  order?: number;

  @IsString({ message: 'O ícone deve ser uma string' })
  @IsOptional()
  icon?: string;

  @IsInt({ message: 'MenuID deve ser um número.' })
  @Min(1)
  @IsOptional()
  menuId?: number;
}
