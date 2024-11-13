import { IsString, Length, IsInt, IsDate } from 'class-validator';

export class CreateDTO {
  @IsString()
  @Length(0, 255)
  name: string;

  @IsInt()
  photo_id: number;

  @IsInt()
  type_id: number;

  @IsDate()
  birth_at: Date;
}
