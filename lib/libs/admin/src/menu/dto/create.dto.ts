import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'O slug deve ser em texto' })
  @IsNotEmpty({ message: 'O slug é obrigatório.' })
  slug: string;

  @IsString({ message: 'A url deve ser em texto' })
  @IsNotEmpty({ message: 'A url é obrigatório.' })
  url: string;

  @IsInt({ message: 'Order deve ser um número.' })
  @Min(1)
  @IsOptional()
  order?: number;

  @IsString({ message: 'O ícone deve ser em texto' })
  @IsOptional()
  icon?: string;

  @IsInt({ message: 'O menu deve ser um número inteiro.' })
  @Min(1)
  @IsOptional()
  menuId?: number;
}
