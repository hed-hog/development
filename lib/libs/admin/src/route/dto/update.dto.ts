import { IsEnum, IsOptional, IsString } from 'class-validator';
import { HttpMethod } from '../../enums/http-method.enum';

export class UpdateDTO {
  @IsString({ message: 'The url must be a valid string.' })
  @IsOptional()
  url?: string;

  @IsString({ message: 'The method must be a string.' })
  @IsOptional()
  @IsEnum(HttpMethod, { message: 'The method must be a valid HTTP method.' })
  method?: HttpMethod;
}
