import { IsEnum, IsString } from 'class-validator';
import { HttpMethod } from '../../enums/http-method.enum';

export class CreateDTO {
  @IsString({ message: 'The url must be a valid string.' })
  url: string;

  @IsString({ message: 'The method must be a string.' })
  @IsEnum(HttpMethod, { message: 'The method must be a valid HTTP method.' })
  method: HttpMethod;
}
