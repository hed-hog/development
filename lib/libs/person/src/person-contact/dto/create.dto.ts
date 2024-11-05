import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateDTO {
  @IsBoolean()
  primary: boolean;

  @IsString()
  @Length(0, 255)
  value: string;
}
