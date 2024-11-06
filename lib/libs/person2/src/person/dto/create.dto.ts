import { IsString, Length, IsDate } from 'class-validator';

export class CreateDTO {
  @IsString()
  @Length(0, 255)
  name: string;

  @IsDate()
  birth_at: Date;
}
