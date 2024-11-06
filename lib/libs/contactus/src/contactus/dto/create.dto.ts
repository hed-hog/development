import { IsString, Length } from 'class-validator';

export class CreateDTO {
  @IsString()
  @Length(0, 255)
  name: string;

  @IsString()
  @Length(0, 255)
  email: string;

  @IsString()
  message: string;
}
