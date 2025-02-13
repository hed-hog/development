import { IsIn, IsString } from 'class-validator';
import { HttpMethod } from '../../types/http-method';

export class CreateDTO {
  @IsString({ message: 'A URL deve ser uma string válida.' })
  url: string;

  @IsString({ message: 'O método deve ser uma string.' })
  @IsIn(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'], {
    message:
      'O método deve ser um método HTTP válido (GET, POST, PUT, DELETE, PATCH, OPTIONS ou HEAD).',
  })
  method: HttpMethod;
}
