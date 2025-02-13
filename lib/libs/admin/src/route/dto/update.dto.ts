import { IsIn, IsOptional, IsString } from 'class-validator';
import { HttpMethod } from '../../types/http-method';

export class UpdateDTO {
  @IsString({ message: 'A URL deve ser uma string válida.' })
  @IsOptional()
  url?: string;

  @IsString({ message: 'O método deve ser uma string.' })
  @IsOptional()
  @IsIn(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'], {
    message:
      'O método deve ser um método HTTP válido (GET, POST, PUT, DELETE, PATCH, OPTIONS ou HEAD).',
  })
  method?: HttpMethod;
}
