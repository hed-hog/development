import { IsIn, IsString } from 'class-validator';
import { HttpMethod } from '../../types/http-method';

export class CreateDTO {
  @IsString({ message: 'The url must be a valid string.' })
  url: string;

  @IsString({ message: 'The method must be a string.' })
  @IsIn(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'], {
    message: 'The method must be a valid HTTP method.',
  })
  method: HttpMethod;
}
