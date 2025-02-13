import { IsOptional, IsString } from 'class-validator';

export class CreateDTO {
  @IsString({ message: 'O nome do bot é obrigatório.' })
  name: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Os cookies devem ser uma string.' })
  cookies?: string;
}
