import { IsIn, IsOptional, IsString } from 'class-validator';
import { HttpMethod } from '../../types/http-method';

export class UpdateDTO {
  @IsString({ message: 'The url must be a valid string.' })
  @IsOptional()
  url?: string;

  @IsString({ message: 'The method must be a string.' })
  @IsOptional()
  @IsIn(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'], {
    message: 'The method must be a valid HTTP method.',
  })
  method?: HttpMethod;
}
